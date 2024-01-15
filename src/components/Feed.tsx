"use client";

import getAllTweets from "@/query/tweetsClient";
import { useQuery } from "@tanstack/react-query";
import Tweet, { TweetData } from "./Tweet";
import { useRouter } from "next/navigation";

const Feed = () => {
  const router = useRouter();

  const { data: tweets, isLoading, isError } = useQuery({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });

  if (isError) {
    localStorage.removeItem("jwt_token");
    router.push("/signin");
  }

  return (
    <div className="min-h-screen w-[100%] md:w-[37.5rem] md:border-x-[1px] border-gray-300">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        tweets?.map((t: TweetData) => <Tweet tweetData={t} key={t.id} />)
      )}
    </div>
  );
};

export default Feed;
