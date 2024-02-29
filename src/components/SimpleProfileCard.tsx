"use client";

import { SimpleProfile } from "@/query/userClient";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  profile: SimpleProfile;
};

function SimpleProfileCard({ profile }: Props) {
  const router = useRouter();

  const onCardClickHandler = () => {
    console.log(`/users/${profile.username}`);
    router.push(`/users/${profile.username}`);
  };

  return (
    <div
      key={profile.id}
      className="border-gray-200 p-2 hover:bg-gray-50 cursor-pointer px-4"
      style={{ fontSize: "0.9rem" }}
      onClick={onCardClickHandler}
    >
      <p className="font-bold">{profile.name}</p>
      <p className="text-gray-500">@{profile.username}</p>
    </div>
  );
}

export default SimpleProfileCard;
