"use client";

import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { ChildData, getBookmarkedPosts } from "@/query/tweetClient";
import Tweet from "@/components/Tweet";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const BookmarksPage = () => {
  const [posts, setPosts] = useState<ChildData[]>([]);
  const router = useRouter();

  useEffect(() => {
    getBookmarkedPosts().then((response) => {
      setPosts(response.data);
    });
  }, []);

  const onBackArrowClick = (event: SyntheticEvent<HTMLElement>) => {
    router.back();
  };

  const onBookmarkRemoval = useCallback((id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div className="flex justify-center">
      <Navigation />
      <div className="min-h-screen w-[100%] md:w-[37.5rem] md:border-x-[1px] border-gray-300">
        <header className="h-11 flex items-center border-b-[1px] border-gray-200 p-2">
          <div onClick={onBackArrowClick}>
            <FaArrowLeft className="h-5 w-5 ml-2 mr-5 hover:cursor-pointer" />
          </div>
          <p className="font-bold text-lg">Bookmarks</p>
        </header>
        {posts &&
          posts.map((post, id) => (
            <Tweet
              tweetData={post}
              key={id}
              onBookmarkRemovalHandler={onBookmarkRemoval}
            />
          ))}
      </div>
    </div>
  );
};

export default BookmarksPage;
