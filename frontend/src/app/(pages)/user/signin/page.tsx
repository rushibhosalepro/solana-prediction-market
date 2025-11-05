"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONFIG } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("fields can not be empty");
      return;
    }
    try {
      const res = await axios.post(`${CONFIG.SERVER_URL}/user/signin`, {
        email,
        password,
      });
      if (res.data.error) {
        alert(res.data.error);
        return;
      }
      return router.push("/market");
    } catch (error) {
      console.error(error);
      alert("somthing went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full mx-auto p-10 rounded-md border">
        <h2 className="text-xl font-semibold text-center mb-8">User signIn</h2>
        <form className="space-y-4" onSubmit={signIn}>
          <div className="space-y-2">
            <Label>email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10"
              placeholder="abc@mail.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10"
              placeholder="****"
            />
          </div>
          <Button type="submit" className="w-full h-10 cursor-pointer">
            sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
