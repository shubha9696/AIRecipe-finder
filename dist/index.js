// server/config.ts
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "..", ".env") });
var OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  recipes;
  userId;
  recipeId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.recipes = /* @__PURE__ */ new Map();
    this.userId = 1;
    this.recipeId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  async createUser(insertUser) {
    const id = this.userId++;
    const user = { ...insertUser, id, emailVerified: false };
    this.users.set(id, user);
    return user;
  }
  async verifyUserEmail(userId) {
    const user = this.users.get(userId);
    if (user) {
      user.emailVerified = true;
      this.users.set(userId, user);
    }
  }
  async getRecipes(userId) {
    return Array.from(this.recipes.values()).filter(
      (recipe) => recipe.userId === userId
    );
  }
  async createRecipe(userId, recipe) {
    const id = this.recipeId++;
    const newRecipe = { ...recipe, id, userId, isFavorite: false };
    this.recipes.set(id, newRecipe);
    return newRecipe;
  }
  async toggleFavorite(userId, recipeId) {
    const recipe = this.recipes.get(recipeId);
    if (recipe && recipe.userId === userId) {
      recipe.isFavorite = !recipe.isFavorite;
      this.recipes.set(recipeId, recipe);
    }
  }
};
var storage = new MemStorage();

// server/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://airecipefinder.vercel.app",
    "X-Title": "AI Recipe Finder"
  }
});
async function generateRecipe(ingredients) {
  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.0-pro-exp-02-05:free",
      messages: [
        {
          role: "system",
          content: "You are a professional chef who creates recipes based on available ingredients. Return recipe in JSON format."
        },
        {
          role: "user",
          content: `Create a recipe using these ingredients: ${ingredients.join(", ")}`
        }
      ],
      response_format: { type: "json_object" }
    });
    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to generate recipe: ${errorMessage}`);
  }
}

// shared/schema.ts
import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  emailVerified: boolean("email_verified").notNull().default(false)
});
var recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  instructions: text("instructions").notNull(),
  ingredients: text("ingredients").array().notNull(),
  isFavorite: boolean("is_favorite").notNull().default(false)
});
var insertUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  username: true,
  password: true
}).extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters")
});
var insertRecipeSchema = createInsertSchema(recipes).pick({
  name: true,
  description: true,
  instructions: true,
  ingredients: true
});

// server/routes.ts
import { z as z2 } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      const user = await storage.createUser(data);
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid request" });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const user = await storage.getUserByUsername(data.username);
      if (!user || user.password !== data.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({ id: user.id, username: user.username });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid request" });
    }
  });
  app2.post("/api/recipes/generate", async (req, res) => {
    try {
      const schema = z2.object({ ingredients: z2.array(z2.string()) });
      const { ingredients } = schema.parse(req.body);
      const recipe = await generateRecipe(ingredients);
      res.json(recipe);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid request" });
    }
  });
  app2.get("/api/recipes/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const recipes2 = await storage.getRecipes(userId);
      res.json(recipes2);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid request" });
    }
  });
  app2.post("/api/recipes/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const recipe = insertRecipeSchema.parse(req.body);
      const savedRecipe = await storage.createRecipe(userId, recipe);
      res.json(savedRecipe);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid request" });
    }
  });
  app2.post("/api/recipes/:userId/:recipeId/favorite", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const recipeId = parseInt(req.params.recipeId);
      await storage.toggleFavorite(userId, recipeId);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid request" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname3 } from "path";
import { fileURLToPath as fileURLToPath3 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname as dirname2 } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath as fileURLToPath2 } from "url";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname2, "client", "src"),
      "@shared": path.resolve(__dirname2, "shared")
    }
  },
  root: path.resolve(__dirname2, "client"),
  build: {
    outDir: path.resolve(__dirname2, "dist"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename3 = fileURLToPath3(import.meta.url);
var __dirname3 = dirname3(__filename3);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname3,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname3, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
