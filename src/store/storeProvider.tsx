"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { setProfile } from "./slices/profileSlice";
import { useRouter } from "next/navigation";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();

    let token = null;

    if (process.browser) {
      console.log(localStorage);
      token = localStorage.getItem("jwt_token");

      if (token) {
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        storeRef.current.dispatch(
          setProfile({ username: tokenPayload.sub, isAuthenticated: true })
        );
      } else {
        router.push("/");
      }
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
