"use client";

import {TweetData, getAllTweets} from "@/query/tweetClient";
import { useQuery } from "@tanstack/react-query";
import Tweet from "./Tweet";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Feed = () => {
  const router = useRouter();

  const { data: tweetsData, isLoading, isSuccess } = useQuery({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });

  const [tweets, setTweets] = useState<TweetData[]>(tweetsData);

  useEffect(() => {
    console.log("IS SUCCESS: " + isSuccess);
    if (!isSuccess && !isLoading) {
      localStorage.removeItem("jwt_token");
      router.push("/signin");
    }
  }, []);

  useEffect(() => setTweets(tweetsData), [tweetsData])

  const onTweetDeletionHandler = useCallback((id: number) => {
    setTweets(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <div className="min-h-screen w-[100%] md:w-[37.5rem] md:border-x-[1px] border-gray-300">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        tweets && tweets.map((t: TweetData) => <Tweet tweetData={t} key={t.id} onDeletionHandler={onTweetDeletionHandler} />)
      )}
    </div>
  );
};

export default Feed;
