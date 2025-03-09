import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1514986888952-8cd320577b68")',
          filter: 'brightness(0.4)'
        }}
      />
      <div className="relative container mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Discover Perfect Recipes with AI
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-[600px]">
            Turn your ingredients into delicious meals using our AI-powered recipe finder. Get personalized recipes instantly.
          </p>
          <Link href="/recipes">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Cooking
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
