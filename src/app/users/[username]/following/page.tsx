"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import UserClient, { SimpleProfile } from "@/query/userClient";
import SimpleProfileCard from "@/components/SimpleProfileCard";

const FollowingPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<SimpleProfile[]>([]);

  const onCardClickHandler = useCallback((profile: SimpleProfile) => {
    router.push(`/users/${profile.username}`);
  }, []);

  useEffect(() => {
    const username = pathname.split("/")[2];
    UserClient.getSubscriptions(username).then((subscribers) =>
      setSubscriptions(subscribers)
    );
  }, []);

  return (
    <div>
      {subscriptions.map((s) => (
        <SimpleProfileCard
          key={s.id}
          profile={s}
          onClickHandler={onCardClickHandler}
        />
      ))}
    </div>
  );
};

export default FollowingPage;
