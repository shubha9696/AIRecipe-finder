export default function About() {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About AI Recipe Finder</h1>
        
        <div className="prose prose-lg">
          <p>
            At AI Recipe Finder, we're passionate about making cooking easier and more enjoyable for everyone. Our mission is to help you discover delicious recipes based on the ingredients you have at hand.
          </p>
          
          <div className="my-12">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978"
              alt="Team collaboration"
              className="rounded-lg w-full"
            />
          </div>

          <h2>Our Mission</h2>
          <p>
            We believe that everyone should be able to cook delicious meals without the stress of complex recipe hunting. Our AI-powered platform takes the ingredients you have and suggests perfect recipes that you can make right now.
          </p>

          <h2>How It Works</h2>
          <p>
            Simply input the ingredients you have in your kitchen, and our advanced AI will generate customized recipes tailored to your available ingredients. Each recipe comes with detailed instructions and helpful tips to ensure your cooking success.
          </p>
        </div>
      </div>
    </main>
  );
}
