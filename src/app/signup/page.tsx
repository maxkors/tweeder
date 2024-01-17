"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/query/userClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !email || !username || !password) return;
    if (name.length < 3 || email.length < 10 || username.length < 3 || password.length < 5) return;

    const response = await signUp(name, email, username, password);

    if (response.status === 200) {
      localStorage.setItem("jwt_token", response.data.token);
      router.replace("/home");
    }
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
