"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SignUp = () => {
  const router = useRouter();

  async function sendSignUpRequest(formData: FormData) {
    const response = await axios.post("http://localhost:8080/api/signup", {
      username: formData.get("username"),
      password: formData.get("password"),
      name: formData.get("name"),
      email: formData.get("email"),
    });

    if (response.status == 200) {
      console.log(response.data?.token);
      localStorage.setItem("jwt", response.data?.token);
      router.push("/home");
    }
    // return response.data;
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    sendSignUpRequest(formData);
  };

  return (
    <div className="flex justify-center">
      <div className="w-80 mt-[20vh]">
        <p className="text-2xl font-bold mb-3">Create your account</p>
        <form onSubmit={onSubmitHandler}>
          <Input type="text" name="name" placeholder="Name" className="mb-3" />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="mb-3"
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            className="mb-3"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-3"
          />
          <Button type="submit" className="w-[100%]">
            Sign up
          </Button>
        </form>
        <p className="font-bold mt-3">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
