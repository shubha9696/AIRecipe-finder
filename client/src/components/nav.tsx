import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiOpenai } from "react-icons/si";
import { ChefHat, UtensilsCrossed, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background/95" />
      <div className="container relative flex h-16 items-center">
        <div className="mr-4 flex flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 20 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ChefHat className="h-6 w-6 text-primary transform transition-transform group-hover:scale-110" />
            </motion.div>
            <span className="hidden font-bold sm:inline-block text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI Recipe Finder
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            <Link href="/about" className="flex items-center space-x-2 hover:text-primary transition-all duration-300 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <UtensilsCrossed className="h-4 w-4 transform transition-transform group-hover:scale-110" />
              </motion.div>
              <span className="opacity-90 group-hover:opacity-100">About</span>
            </Link>
            <Link href="/popular-recipes" className="flex items-center space-x-2 hover:text-primary transition-all duration-300 group">
              <motion.div
                whileHover={{ rotate: -15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <BookOpen className="h-4 w-4 transform transition-transform group-hover:scale-110" />
              </motion.div>
              <span className="opacity-90 group-hover:opacity-100">Popular Recipes</span>
            </Link>
            <Link href="/recipes" className="flex items-center space-x-2 hover:text-primary transition-all duration-300 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <SiOpenai className="h-4 w-4 transform transition-transform group-hover:scale-110" />
              </motion.div>
              <span className="opacity-90 group-hover:opacity-100">AI Recipes</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/auth">
              <Button 
                variant="outline" 
                size="sm" 
                className="font-medium border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button 
                size="sm" 
                className="font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              >
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}