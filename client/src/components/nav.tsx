import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiOpenai } from "react-icons/si";
import { ChefHat, UtensilsCrossed, BookOpen } from "lucide-react";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block text-lg">
              AI Recipe Finder
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            <Link href="/about" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <UtensilsCrossed className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link href="/popular-recipes" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>Popular Recipes</span>
            </Link>
            <Link href="/recipes" className="flex items-center space-x-2 hover:text-primary transition-colors">
              <SiOpenai className="h-4 w-4" />
              <span>AI Recipes</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/auth">
              <Button variant="outline" size="sm" className="font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="font-medium">
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}