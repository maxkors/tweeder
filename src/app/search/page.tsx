"use client";

import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import SimpleProfileCard from "@/components/SimpleProfileCard";
import { Input } from "@/components/ui/input";
import UserClient, { SimpleProfile } from "@/query/userClient";
import React, { useState } from "react";

const SearchPage = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<SimpleProfile[]>([]);

  const onInputFocus = () => {
    setOpen(true);
  };
  const onInputBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };

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
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={onInputChange}
          className="w-full"
          autoFocus={true}
        />
       </div>
        <div>
          {profiles.map((profile) => (
            <SimpleProfileCard profile={profile} key={profile.id} />
          ))}
        </div>
      </section>
      <Sidebar />
    </div>
  );
};

export default SearchPage;
