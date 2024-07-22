"use client";

import { SimpleProfile } from "@/query/userClient";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect } from "react";

type Props = {
  profile: SimpleProfile;
  onClickHandler: Function;
};

function SimpleProfileCard({ profile, onClickHandler }: Props) {

  useEffect(() => {console.log(profile)}, []);

  return (
    <div
      key={profile.id}
      className="border-gray-200 p-2 hover:bg-gray-50 cursor-pointer px-4 flex"
      style={{ fontSize: "0.9rem" }}
      onClick={() => onClickHandler(profile)}
    >
      <Avatar className="mr-2">
        <AvatarImage src={profile.avatarUrl} />
        <AvatarFallback>{profile.name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-bold">{profile.name}</p>
        <p className="text-gray-500">@{profile.username}</p>
      </div>
    </div>
  );
}

export default SimpleProfileCard;
