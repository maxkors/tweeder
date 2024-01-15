"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SignIn = () => {
  const router = useRouter();
  const onSubmitClick = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    const response = await axios.post(
      "http://localhost:8081/api/auth/signin",
      // formData,
      {
        username: formData.get("username"),
        password: formData.get("password"),
      },
      {
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        // },
        withCredentials: true,
      }
    );

    console.log(response.data);

    localStorage.setItem("jwt_token", response.data.token);
    router.replace("/home");
  };

  return (
    <div className="flex justify-center">
      <div className="w-80 mt-[20vh]">
        <p className="text-2xl font-bold mb-3">Sign in to Tweeder</p>
        <form onSubmit={onSubmitClick}>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            className="mb-3"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="mb-3"
          />
          <Button type="submit" className="w-[100%]">
            Sign in
          </Button>
        </form>
        <p className="font-bold mt-3">
          Don't have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
