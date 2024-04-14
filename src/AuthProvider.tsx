"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch } from "./store/hooks";
import { setProfile } from "./store/slices/profileSlice";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (process.browser) {
      console.log(localStorage);
      let token = localStorage.getItem("jwt_token");
  
      if (token) {
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        dispatch(
          setProfile({ username: tokenPayload.sub, isAuthenticated: true })
        );
      } else {
        router.push("/");
      }
    // }
  }, [])

  return children;
}
