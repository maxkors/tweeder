"use client";

import { SimpleProfile } from "@/query/userClient";

type Props = {
  profile: SimpleProfile;
  onClickHandler: Function;
};

function SimpleProfileCard({ profile, onClickHandler }: Props) {

  return (
    <div
      key={profile.id}
      className="border-gray-200 p-2 hover:bg-gray-50 cursor-pointer px-4"
      style={{ fontSize: "0.9rem" }}
      onClick={() => onClickHandler(profile)}
    >
      <p className="font-bold">{profile.name}</p>
      <p className="text-gray-500">@{profile.username}</p>
    </div>
  );
}

export default SimpleProfileCard;
