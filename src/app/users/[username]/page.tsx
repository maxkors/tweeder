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

const Profile = ({ params }: Props) => {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    getProfile(params.username).then((data) => {
      setProfile(data);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <Navigation />
      {profile ? <ProfileCard data={profile} /> : ""}
    </div>
  );
};

export default Profile;
