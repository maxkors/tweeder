"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import UserClient, { SimpleProfile } from "@/query/userClient";
import SimpleProfileCard from "@/components/SimpleProfileCard";

const FollowersPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<SimpleProfile[]>([]);

  const onCardClickHandler = useCallback((profile: SimpleProfile) => {
    router.push(`/users/${profile.username}`);
  }, []);

  useEffect(() => {
    const username = pathname.split("/")[2];
    UserClient.getSubscribers(username).then((subscribers) =>
      setSubscribers(subscribers)
    );
  }, []);

  return (
    <div>
      {subscribers.map((s) => (
        <SimpleProfileCard
          key={s.id}
          profile={s}
          onClickHandler={onCardClickHandler}
        />
      ))}
    </div>
  );
};

export default FollowersPage;
