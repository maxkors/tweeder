"use client";

import React, { useEffect, useState } from "react";
import { cookies, headers } from "next/headers";
import axios from "axios";
import getProfile, { Profile } from "@/query/userClient";
import Navigation from "@/components/Navigation";
import ProfileCard from "@/components/ProfileCard";

const Profile = () => {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <Navigation />
      <ProfileCard data={profile} />
    </div>
  );
};

export default Profile;
