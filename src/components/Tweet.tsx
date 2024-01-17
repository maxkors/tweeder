"use client";

import dayjs from "dayjs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { TweetData, TweetDataWithComments } from "@/query/tweetClient";
import { cn } from "@/lib/utils";

type Props = {
  tweetData?: TweetData | TweetDataWithComments;
  detailed?: boolean;
};

const Tweet = ({ tweetData, detailed }: Props) => {
  const router = useRouter();

  const onClickHandler = (event: SyntheticEvent<HTMLElement>) => {
    const tweetId = event.currentTarget.dataset.id;
    router.push(`/tweets/${tweetId}`);
  };

  return (
    <article
      className="border-b-[1px] border-gray-200 p-2 hover:bg-gray-50 hover:cursor-pointer"
      onClick={onClickHandler}
      data-id={tweetData?.id}
    >
      <div className="flex mb-1">
        <span className="mr-2 font-bold">{tweetData?.user.name}</span>
        <span className="mr-2 text-gray-600">@{tweetData?.user.username}</span>
        <span className="text-gray-600">
          {dayjs(tweetData?.dateTime).format("H:m MMM D")}
        </span>
      </div>
      <p className={cn("mb-2", detailed && "text-lg")} >{tweetData?.text}</p>
      <div className="flex justify-around">
        <div className="flex justify-center items-center">
          <BiCommentDetail className="h-4 w-4 mr-1" />
          {/* <span className="text-sm">{tweetData.comments}</span> */}
          <span className="text-sm">{tweetData?.commentsCount}</span>
        </div>
        <div className="flex justify-center items-center">
          <AiOutlineHeart className="h-4 w-4 mr-1" />
          <span className="text-sm">{tweetData?.likesCount}</span>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
