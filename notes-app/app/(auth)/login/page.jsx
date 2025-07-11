"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Input } from "@/components/ui/input";

import Link from "next/link"; // jeśli Next.js

import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/dashboard");
      toast.success("login successful");
    } else if (res?.status === 401) {
      setError("Invalid Credentons");
      setPending(false);
    } else {
      setError("Something went wrong");
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#1c190e]">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Login </CardTitle>
          <CardDescription className="text-center text-sm text-accent-foreground">
            Use email or service to login to existing account
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              disabled={pending}
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              disabled={pending}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button className="w-full" size="lg" disabled={pending}>
              Continue
            </Button>
          </form>

          <Separator />

          <p className="text-center text-sm mt-2 text-muted-foreground">
            Create a new account{" "}
            <Link
              className="text-sky-700 ml-4 hover:underline cursor-pointer"
              href="signup"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
        <div className="pt-4 text-center">
          <Button variant="ghost" onClick={() => router.push("/")}>
            ← Back to home page
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
