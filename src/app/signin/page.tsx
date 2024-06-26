"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/query/userClient";
import { useAppDispatch } from "@/store/hooks";
import { setProfile } from "@/store/slices/profileSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !password) return;
    if (username.length < 3 || password.length < 5) return;

    const response = await signIn(username, password);

    if (response.status === 200) {
      const token = response.data.token;
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      dispatch(setProfile({ username: tokenPayload.sub, isAuthenticated: true }))

      localStorage.setItem("jwt_token", response.data.token);
      router.replace("/home");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-80 mt-[20vh]">
        <p className="text-2xl font-bold mb-3">Sign in to Tweeder</p>
        <form onSubmit={onSubmitHandler}>
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
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
