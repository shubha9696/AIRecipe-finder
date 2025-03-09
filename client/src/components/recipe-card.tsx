import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { Recipe } from "@shared/schema";

interface RecipeCardProps {
  recipe: Recipe;
  onFavorite?: (id: number) => void;
}

export function RecipeCard({ recipe, onFavorite }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <CardTitle className="text-2xl">{recipe.name}</CardTitle>
          {onFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onFavorite(recipe.id)}
              className={recipe.isFavorite ? "text-red-500" : ""}
            >
              <Heart className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{recipe.description}</p>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Ingredients:</h4>
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i} className="text-sm">{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Instructions:</h4>
            <p className="text-sm whitespace-pre-line">{recipe.instructions}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
