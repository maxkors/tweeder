"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import UserClient, { SimpleProfile } from "@/query/userClient";
import SimpleProfileCard from "./SimpleProfileCard";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<SimpleProfile[]>([]);
  const router = useRouter();


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

  const onCardClickHandler = (profile: SimpleProfile) => {
    router.push(`/users/${profile.username}`);
  };

  return (
    <aside className="p-2 hidden md:block">
      <section className="relative">
        <Input
          name="search"
          type="text"
          placeholder="Search"
          autoComplete="off"
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onChange={onInputChange}
          className="w-48"
        />
        <ScrollArea
          className={`max-h-72 w-48 rounded-md absolute top-12 z-10 bg-white ${
            profiles.length && "border"
          }`}
          style={{
            display: isOpen ? "block" : "none",
            position: "absolute",
          }}
        >
          <div>
            {profiles.map((profile) => (
              <SimpleProfileCard profile={profile} onClickHandler={onCardClickHandler} key={profile.id} />
            ))}
          </div>
        </ScrollArea>
      </section>
    </aside>
  );
};

export default Sidebar;
