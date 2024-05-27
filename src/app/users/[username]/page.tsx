"use client";

import { useEffect, useState } from "react";
import { Profile, getProfile } from "@/query/userClient";
import Navigation from "@/components/Navigation";
import ProfileCard from "@/components/ProfileCard";

type Props = {
  params: {
    username: string;
  };
};

const ProfilePage = ({ params }: Props) => {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    getProfile(params.username).then((data) => {
      setProfile(data);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <Navigation />
      <div className="min-h-screen w-[100%] md:w-[37.5rem] md:border-x-[1px] border-gray-300">
        {profile ? <ProfileCard data={profile} /> : ""}
      </div>
    </div>
  );
};

export default ProfilePage;
