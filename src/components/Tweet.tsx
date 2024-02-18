"use client";

import dayjs from "dayjs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChildData,
  TweetDataWithChildren,
  addLikeToPost,
  removeLikeFromPost,
} from "@/query/tweetClient";
import { cn } from "@/lib/utils";

type Props = {
  tweetData: ChildData | TweetDataWithChildren;
  detailed?: boolean;
};

const Tweet = ({ tweetData, detailed }: Props) => {
  const router = useRouter();
  const [data, setData] = useState<ChildData | TweetDataWithChildren>(
    tweetData
  );

  const onPostClickHandler = (event: SyntheticEvent<HTMLElement>) => {
    const tweetId = event.currentTarget.dataset.id;
    router.push(`/tweets/${tweetId}`);
  };

  const onUserClickHandler = (event: SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();
    router.push(`/users/${tweetData?.user.username}`);
  };

  const onLikeClickHandler = (event: SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();

    if (data.liked) {
      setData((prev) => ({
        ...prev,
        liked: !prev.liked,
        likesCount: prev.likesCount - 1,
      }));
      removeLikeFromPost(data.id);
    } else {
      setData((prev) => ({
        ...prev,
        liked: !prev.liked,
        likesCount: prev.likesCount + 1,
      }));
      addLikeToPost(data.id);
    }
  };

  // const mediaHeightClass = `h-[${tweetData.media.length > 2 ? '50%' : '100%'}]`;
  // const mediaWidthClass= `w-[${tweetData.media.length > 1 ? '50%' : '100%'}]`;
  // max-h-[50%]

  const mediaHeightClass = () =>
    tweetData.media.length > 2 ? "calc(10rem - 1px)" : "20rem";
  const mediaWidthClass = () =>
    tweetData.media.length > 1 ? "calc(50% - 1px)" : "100%";

  return (
    <article
      className="border-b-[1px] border-gray-200 p-2 hover:bg-gray-50 hover:cursor-pointer"
      onClick={onPostClickHandler}
      data-id={tweetData.id}
    >
      <div className="flex mb-1">
        <span
          className="mr-2 font-bold hover:underline"
          onClick={onUserClickHandler}
        >
          {tweetData.user.name}
        </span>
        <span
          className="mr-2 text-gray-600 hover:underline"
          onClick={onUserClickHandler}
        >
          @{tweetData.user.username}
        </span>
        <span className="text-gray-600">
          {dayjs(tweetData.dateTime).format("H:mm MMM D")}
        </span>
      </div>

      <p className={cn("mb-2", detailed && "text-lg")}>{tweetData.text}</p>

      {tweetData.media.length > 0 && (
        <div className="mb-2 rounded-lg overflow-hidden h-[20rem] flex flex-wrap gap-[2px]">
          {tweetData.media.map((media, id) => (
            <div
              className={`overflow-hidden`}
              key={id}
              style={{ height: mediaHeightClass(), width: mediaWidthClass() }}
            >
              {media.type === "image" && (
                <img
                  src={`http://localhost/images/${media?.urn}`}
                  alt=""
                  className={`object-cover object-center h-[100%] w-[100%]`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-around">
        <div className="flex justify-center items-center">
          <BiCommentDetail className="h-4 w-4 mr-1" />
          {/* <span className="text-sm">{tweetData.comments}</span> */}
          <span className="text-sm">{tweetData.commentsCount}</span>
        </div>
        <div
          className="flex justify-center items-center"
          onClick={onLikeClickHandler}
        >
          {data.liked ? (
            <AiFillHeart className="h-4 w-4 mr-1" style={{ color: "red" }} />
          ) : (
            <AiOutlineHeart className="h-4 w-4 mr-1" />
          )}
          <span className="text-sm">{data.likesCount}</span>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
