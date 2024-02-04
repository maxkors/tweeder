"use client";

import Navigation from "@/components/Navigation";
import Tweet from "@/components/Tweet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaArrowLeft } from "react-icons/fa6";
import {
  ChildData,
  TweetData,
  TweetDataWithChildren,
  createPost,
  getTweetById,
} from "@/query/tweetClient";
import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Comment from "@/components/Comment";

type Props = {
  params: {
    id: string;
  };
};

const TweetPage = ({ params }: Props) => {
  const [tweetData, setTweetData] = useState<TweetDataWithChildren>();
  const [children, setChildren] = useState<ChildData[]>([]);
  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getTweetById(Number(params.id)).then((data: TweetDataWithChildren) => {
      setTweetData(data);
      setChildren(data.children);
    });
  }, []);

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const content = formData.get("content")?.toString();

    if (!content || content.length < 1) return;

    const response = await createPost(content, Number(params.id));

    if (response.status === 200) {
      //@ts-ignore
      setTweetData((prev) => ({
        ...prev,
        commentsCount: prev ? prev.commentsCount + 1 : 1,
      }));
      setChildren((prev) => [...prev, response.data]);
      textAreaRef.current!.value = "";
    }
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
        {tweetData && <Tweet tweetData={tweetData} detailed />}
        <form
          className="border-b-[1px] border-gray-200 p-2"
          onSubmit={onSubmitHandler}
        >
          <Textarea
            name="content"
            className="mb-2 resize-none"
            placeholder="Post your comment"
            ref={textAreaRef}
          />
          <Button className="" type="submit">
            Reply
          </Button>
        </form>
        {children.toReversed().map((child, id) => (
          <Tweet tweetData={child} key={id} />
        ))}
      </div>
    </div>
  );
};

export default TweetPage;
