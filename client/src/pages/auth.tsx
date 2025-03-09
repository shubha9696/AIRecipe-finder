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
import { OTPInput } from "@/components/ui/otp-input";
import { ChefHat, Mail, Key, User, Lock, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const otpForm = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      if (showOTP) {
        // Verify OTP
        const res = await apiRequest("POST", "/api/auth/verify-otp", {
          email: form.getValues("email"),
          otp: values.otp,
        });
        return res.json();
      } else {
        // Register or Login
        const res = await apiRequest(
          "POST",
          `/api/auth/${isLogin ? "login" : "register"}`,
          values
        );
        return res.json();
      }
    },
    onSuccess: (data) => {
      if (!isLogin && !showOTP) {
        setShowOTP(true);
        toast({
          title: "Verification code sent!",
          description: "Please check your email for the verification code.",
        });
      } else {
        toast({
          title: isLogin ? "Welcome back!" : "Account created successfully!",
          description: "Let's find some delicious recipes!",
        });
        setLocation("/recipes");
      }
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const formContent = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className="space-y-4"
      >
        {!isLogin && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Enter your full name" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Enter your email" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input className="pl-10" placeholder="Choose a username" {...field} />
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
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    className="pl-10"
                    placeholder="Choose a password"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2 pt-2">
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight className="ml-2 h-4 w-4" />
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
  );

  const otpContent = (
    <Form {...otpForm}>
      <form
        onSubmit={otpForm.handleSubmit((data) => mutation.mutate(data))}
        className="space-y-6"
      >
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-medium">Verify your email</h3>
          <p className="text-sm text-muted-foreground">
            We've sent a verification code to {form.getValues("email")}
          </p>
        </div>
        <FormField
          control={otpForm.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <OTPInput
                  length={6}
                  onComplete={(value) => {
                    field.onChange(value);
                    otpForm.handleSubmit((data) => mutation.mutate(data))();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isPending}
        >
          Verify Email
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 gap-0">
      {/* Hero Section */}
      <motion.div 
        className="hidden lg:flex flex-col justify-center p-12 bg-primary/5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-lg mx-auto space-y-6">
          <div className="flex items-center space-x-3">
            <ChefHat className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">AI Recipe Finder</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Discover amazing recipes tailored to your ingredients using advanced AI technology. Join our community of food enthusiasts today!
          </p>
          <div className="grid grid-cols-2 gap-4 pt-8">
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-3 bg-primary/10 rounded-lg w-fit">
                <ChefHat className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Smart Suggestions</h3>
              <p className="text-sm text-muted-foreground">Get AI-powered recipe recommendations</p>
            </motion.div>
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-3 bg-primary/10 rounded-lg w-fit">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Save Favorites</h3>
              <p className="text-sm text-muted-foreground">Build your recipe collection</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Auth Form */}
      <div className="flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                {showOTP ? "Verify Email" : isLogin ? "Welcome back" : "Create an account"}
              </CardTitle>
              <CardDescription>
                {showOTP
                  ? "Enter the verification code sent to your email"
                  : isLogin
                  ? "Enter your credentials to access your account"
                  : "Sign up to start discovering AI-powered recipes"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showOTP ? otpContent : formContent}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}