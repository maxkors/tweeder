"use client";

import getAllTweets from "@/query/tweetsClient";
import { useQuery } from "@tanstack/react-query";
import Tweet, { TweetData } from "./Tweet";

const Feed = () => {
  const { data: tweets, isLoading } = useQuery({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });

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
