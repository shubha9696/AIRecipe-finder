import { users, recipes, type User, type Recipe, type InsertUser, type InsertRecipe } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyUserEmail(userId: number): Promise<void>;
  getRecipes(userId: number): Promise<Recipe[]>;
  createRecipe(userId: number, recipe: InsertRecipe): Promise<Recipe>;
  toggleFavorite(userId: number, recipeId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private recipes: Map<number, Recipe>;
  private userId: number;
  private recipeId: number;

  constructor() {
    this.users = new Map();
    this.recipes = new Map();
    this.userId = 1;
    this.recipeId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id, emailVerified: false };
    this.users.set(id, user);
    return user;
  }

  async verifyUserEmail(userId: number): Promise<void> {
    const user = this.users.get(userId);
    if (user) {
      user.emailVerified = true;
      this.users.set(userId, user);
    }
  }

  async getRecipes(userId: number): Promise<Recipe[]> {
    return Array.from(this.recipes.values()).filter(
      (recipe) => recipe.userId === userId
    );
  }

  async createRecipe(userId: number, recipe: InsertRecipe): Promise<Recipe> {
    const id = this.recipeId++;
    const newRecipe: Recipe = { ...recipe, id, userId, isFavorite: false };
    this.recipes.set(id, newRecipe);
    return newRecipe;
  }

  async toggleFavorite(userId: number, recipeId: number): Promise<void> {
    const recipe = this.recipes.get(recipeId);
    if (recipe && recipe.userId === userId) {
      recipe.isFavorite = !recipe.isFavorite;
      this.recipes.set(recipeId, recipe);
    }
  }
}

export const storage = new MemStorage();