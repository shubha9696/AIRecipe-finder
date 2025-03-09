import { useQuery } from "@tanstack/react-query";
import { RecipeCard } from "@/components/recipe-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@shared/schema";

export default function Profile() {
  const { data: recipes } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes/1"], // Hardcoded user ID for demo
  });

  const favoriteRecipes = recipes?.filter((recipe) => recipe.isFavorite) || [];

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>My Favorite Recipes</CardTitle>
        </CardHeader>
        <CardContent>
          {favoriteRecipes.length === 0 ? (
            <p className="text-muted-foreground">No favorite recipes yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
