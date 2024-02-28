"use client";

import dayjs from "dayjs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoBookmark, IoBookmarkOutline, IoLink } from "react-icons/io5";
import { FiShare2 } from "react-icons/fi";
import { BsEnvelope } from "react-icons/bs";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChildData,
  TweetDataWithChildren,
  addLikeToPost,
  addPostToBookmarks,
  deletePostById,
  removeLikeFromPost,
  removePostFromBookmarks,
} from "@/query/tweetClient";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { IoIosMore } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Props = {
  tweetData: ChildData | TweetDataWithChildren;
  detailed?: boolean;
  onDeletionHandler?: (id: number) => void;
};

const Tweet = ({ tweetData, detailed, onDeletionHandler }: Props) => {
  const router = useRouter();
  const username = useSelector((state: RootState) => state.profile.username);
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

  const mediaHeightClass = () =>
    tweetData.media.length > 2 ? "calc(10rem - 1px)" : "20rem";

  const mediaWidthClass = () =>
    tweetData.media.length > 1 ? "calc(50% - 1px)" : "100%";

  const deletionHandler = (event: SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();
    deletePostById(tweetData.id);
    onDeletionHandler && onDeletionHandler(tweetData.id);
  };

  const bookmarkHandler = (event: SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();

    if (data.bookmarked) {
      setData((prev) => ({
        ...prev,
        bookmarked: !prev.bookmarked,
      }));
      removePostFromBookmarks(data.id);
    } else {
      setData((prev) => ({
        ...prev,
        bookmarked: !prev.bookmarked,
      }));
      addPostToBookmarks(data.id);
    }
  };

  const copyToClipboardHandler = () => {
    navigator.clipboard.writeText(`http://localhost:3000/tweets/${tweetData.id}`);
  }

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-full h-8 w-8"
            >
              <IoIosMore className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {tweetData.user.username === username && (
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={(e) => deletionHandler(e)}
                >
                  <FaRegTrashAlt />
                  <span className="font-bold ml-2">Delete</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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

        <div
          className="flex justify-center items-center"
          onClick={bookmarkHandler}
        >
          {data.bookmarked ? (
            <IoBookmark className="h-4 w-4 mr-1" style={{ color: "lightblue" }} />
          ) : (
            <IoBookmarkOutline className="h-4 w-4" />
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="flex justify-center items-center"
            >
              <FiShare2 className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={copyToClipboardHandler}>
                <IoLink />
                <span className="font-bold ml-2">Copy link</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BsEnvelope />
                <span className="font-bold ml-2">Share via Direct Message</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
};

export default Tweet;
