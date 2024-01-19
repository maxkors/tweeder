"use client";

import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BsPerson, BsEnvelope } from "react-icons/bs";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { FormEvent, useState } from "react";
import { createTweet, getAllTweets } from "@/query/tweetClient";
import { useQuery } from "@tanstack/react-query";

const Navigation = () => {
  const { refetch } = useQuery({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const content = formData.get("content")?.toString();

    if (!content || content.length < 1) return;

    const response = await createTweet(content);

    if (response.status === 200) {
      refetch();
      setDialogOpen(false);
    }
  };

  return (
    <nav className="fixed bottom-0 w-[100%] border-t-[1px] border-gray-300 p-2 md:px-4 md:static md:w-auto md:border-none">
      <ul className="flex justify-around md:justify-normal md:block">
        <li className="md:mb-4">
          <Link href="/home" className="flex">
            <AiOutlineHome className="h-6 w-6 md:mr-3" />
            <span className="hidden lg:inline">Home</span>
          </Link>
        </li>
        <li className="md:mb-4">
          <Link href="/messages" className="flex">
            <BsEnvelope className="h-6 w-6 md:mr-3" />
            <span className="hidden lg:inline">Messages</span>
          </Link>
        </li>
        <li className="md:mb-4">
          <Link href="/profile" className="flex">
            <BsPerson className="h-6 w-6 md:mr-3" />
            <span className="hidden lg:inline">Profile</span>
          </Link>
        </li>
        <li>
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full font-bold"
                onClick={() => setDialogOpen(true)}
              >
                Post
              </Button>
            </DialogTrigger>
            <DialogContent className="top-[20vh]">
              <DialogHeader>
                <DialogTitle>Write your post</DialogTitle>
              </DialogHeader>
              <form
                className="border-b-[1px] border-gray-200 p-2"
                onSubmit={onSubmitHandler}
              >
                <Textarea name="content" className="resize-none mb-3" />
                <Button className="w-20" type="submit">
                  Post
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
