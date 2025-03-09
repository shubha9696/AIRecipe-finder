import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/recipe-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Recipe } from "@shared/schema";

const ingredientsSchema = z.object({
  ingredients: z.string(),
});

export default function Recipes() {
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(ingredientsSchema),
    defaultValues: {
      ingredients: "",
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (values: { ingredients: string }) => {
      const ingredients = values.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);
      const res = await apiRequest("POST", "/api/recipes/generate", {
        ingredients,
      });
      return res.json();
    },
    onSuccess: (data) => {
      setGeneratedRecipe(data);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (recipe: Recipe) => {
      const res = await apiRequest("POST", "/api/recipes/1", recipe); // Hardcoded user ID for demo
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Recipe saved successfully!",
      });
    },
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Recipe Finder</h1>

      <div className="max-w-2xl mb-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => generateMutation.mutate(data))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your ingredients (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. chicken, rice, tomatoes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={generateMutation.isPending}
              className="w-full"
            >
              Generate Recipe
            </Button>
          </form>
        </Form>
      </div>

      {generatedRecipe && (
        <div className="max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Generated Recipe</h2>
            <Button
              onClick={() => saveMutation.mutate(generatedRecipe)}
              disabled={saveMutation.isPending}
            >
              Save Recipe
            </Button>
          </div>
          <RecipeCard recipe={generatedRecipe} />
        </div>
      )}
    </div>
  );
}
