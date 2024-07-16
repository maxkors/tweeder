"use client";

import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import SimpleProfileCard from "@/components/SimpleProfileCard";
import { Input } from "@/components/ui/input";
import UserClient, { SimpleProfile } from "@/query/userClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchPage = () => {
  const [profiles, setProfiles] = useState<SimpleProfile[]>([]);
  const router = useRouter();

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.trim();

    if (inputValue.length > 0) {
      UserClient.searchProfiles(inputValue).then((res) => {
        setProfiles(res.data);
      });
    } else {
      setProfiles([]);
    }
  };

  const onCardClickHandler = (profile: SimpleProfile) => {
    router.push(`/users/${profile.username}`);
  };

  return (
    <div className="flex justify-center">
      <Navigation />
      <section className="min-h-screen w-[100%] md:w-[37.5rem] md:border-x-[1px] border-gray-300">
        <div className="p-4">
          <Input
            name="search"
            type="text"
            placeholder="Search"
            autoComplete="off"
            onChange={onInputChange}
            className="w-full"
          />
        </div>
        <div>
          {profiles.map((profile) => (
            <SimpleProfileCard profile={profile} onClickHandler={onCardClickHandler} key={profile.id} />
          ))}
        </div>
      </section>
      <Sidebar />
    </div>
  );
};

export default SearchPage;
