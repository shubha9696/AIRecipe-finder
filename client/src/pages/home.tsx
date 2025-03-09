import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Smart Suggestions</h3>
            <p className="text-muted-foreground">
              Get AI-powered recipe recommendations based on your available ingredients
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Save Favorites</h3>
            <p className="text-muted-foreground">
              Keep track of your favorite recipes for quick access
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Detailed Instructions</h3>
            <p className="text-muted-foreground">
              Follow step-by-step cooking instructions for perfect results
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
