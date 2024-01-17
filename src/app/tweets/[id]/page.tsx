"use client";

import Comment from "@/components/Comment";
import Navigation from "@/components/Navigation";
import Tweet from "@/components/Tweet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaArrowLeft } from "react-icons/fa6";
import { TweetDataWithComments, getTweetById } from "@/query/tweetClient";
import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const TweetPage = ({ params }: Props) => {
  const [tweetData, setTweetData] = useState<TweetDataWithComments>();
  const router = useRouter();

  useEffect(() => {
    getTweetById(Number(params.id)).then((data) => {
      setTweetData(data);
    });
  }, []);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  };

  const onBackArrowClick = (event: SyntheticEvent<HTMLElement>) => {
    router.back();
  };

  return (
    <div className="flex justify-center">
      <Navigation />
      <div className="min-h-screen w-[100%] md:w-[37.5rem] md:border-x-[1px] border-gray-200">
        <header className="h-11 flex items-center border-b-[1px] border-gray-200 p-2">
          <div onClick={onBackArrowClick}>
            <FaArrowLeft className="h-5 w-5 ml-2 mr-5 hover:cursor-pointer" />
          </div>
          <p className="font-bold text-lg">Post</p>
        </header>
        <Tweet tweetData={tweetData} detailed />
        <form
          className="border-b-[1px] border-gray-200 p-2"
          onSubmit={onSubmitHandler}
        >
          <Textarea
            className="mb-2 resize-none"
            placeholder="Post your comment"
          />
          <Button className="" type="submit">
            Reply
          </Button>
        </form>
        {tweetData?.comments.map((comment, id) => (
          <Comment data={comment} key={id} />
        ))}
      </div>
    </div>
  );
};

export default TweetPage;
