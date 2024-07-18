import { getAllTweets, TweetData } from "@/query/tweetClient";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Tweet from "./Tweet";

const SubscriptionPosts = () => {
  const router = useRouter();

  const {
    data: tweetsData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });

  const [tweets, setTweets] = useState<TweetData[]>(tweetsData);  

  useEffect(() => {
    if (!isSuccess && !isLoading) {
      localStorage.removeItem("jwt_token");
      router.push("/signin");
    }
  }, []);

  useEffect(() => setTweets(tweetsData), [tweetsData]);

  const onTweetDeletionHandler = useCallback((id: number) => {
    setTweets((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    tweets &&
      tweets.map((t: TweetData) => (
        <Tweet
          tweetData={t}
          key={t.id}
          onDeletionHandler={onTweetDeletionHandler}
        />
      ))
  );
};

export default SubscriptionPosts;
