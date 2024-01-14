"use client";

import React, { useEffect, useState } from "react";
import { cookies, headers } from "next/headers";
import axios from "axios";
import getProfile from "@/query/userClient";

const Profile = () => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
    });
  }, []);

  return <div>{JSON.stringify(profile, null, 2)}</div>;
};

export default Profile;
