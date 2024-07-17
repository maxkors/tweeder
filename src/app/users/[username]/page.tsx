"use client";

import { useEffect, useState } from "react";
import { Profile, getProfile } from "@/query/userClient";
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

  return profile ? <ProfileCard data={profile} /> : "";
};

export default ProfilePage;
