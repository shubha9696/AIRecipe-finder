import { useState } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { insertUserSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChefHat, Key, User } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: { username: string; password: string }) => {
      const res = await apiRequest(
        "POST",
        `/api/auth/${isLogin ? "login" : "register"}`,
        values
      );
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: isLogin ? "Welcome back!" : "Account created successfully!",
        description: isLogin ? "Happy to see you again!" : "Let's find some delicious recipes!",
      });
      setLocation("/recipes");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 gap-0">
      {/* Hero Section */}
      <div className="hidden lg:flex flex-col justify-center p-12 bg-primary/5">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="flex items-center space-x-3">
            <ChefHat className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">AI Recipe Finder</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Discover amazing recipes tailored to your ingredients using advanced AI technology. Join our community of food enthusiasts today!
          </p>
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="space-y-2">
              <div className="p-3 bg-primary/10 rounded-lg w-fit">
                <ChefHat className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Smart Suggestions</h3>
              <p className="text-sm text-muted-foreground">Get AI-powered recipe recommendations</p>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-primary/10 rounded-lg w-fit">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Save Favorites</h3>
              <p className="text-sm text-muted-foreground">Build your recipe collection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form */}
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Welcome back" : "Create an account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your credentials to access your account"
                : "Sign up to start discovering AI-powered recipes"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input className="pl-10" placeholder="Enter your username" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="password"
                            className="pl-10"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up"
                      : "Already have an account? Sign In"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}