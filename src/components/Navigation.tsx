"use client";

import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BsPerson, BsEnvelope, BsFeather } from "react-icons/bs";
import { IoBookmarkOutline, IoSearchOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import { createPost, createPost2, getAllTweets } from "@/query/tweetClient";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Input } from "./ui/input";
import { MediaData } from "@/query/storageClient";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const { refetch } = useQuery({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const username = useSelector((state: RootState) => state.profile.username);
  const pathname = usePathname();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const text = formData.get("text")?.toString();
    const file = formData.get("media");

    console.log(formData);

    // let mediaData = [];

    // if (file) {
    //   console.log("MEDIA: ");
    //   console.log(file);
    //   console.log(file.name);

    //   mediaData.push({
    //     name: file.name,
    //     type: file.type
    //   });
    // }

    if (!text || text.length < 1) return;

    // formData.append()

    const response = await createPost(text, file);
    // const response = await createPost2(formData);

    if (response.status === 200) {
      refetch();
      setDialogOpen(false);
    }
  };

  const onMediaChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
  };

  return (
    <nav className="fixed bottom-0 w-[100%] border-t-[1px] border-gray-300 p-2 md:px-4 md:static md:w-auto md:border-none bg-white">
      <ul className="flex justify-around md:justify-normal md:block">
        <li className="md:mb-4">
          <Link href="/home" className="flex">
            <AiOutlineHome className="h-6 w-6 md:mr-3" />
            <span className="hidden lg:inline">Home</span>
          </Link>
        </li>
        <li className="md:hidden">
          <Link href="/search" className="flex">
            <IoSearchOutline className="h-6 w-6 md:mr-3" />
          </Link>
        </li>
        <li className="md:mb-4">
          <Link href="/chats" className="flex">
            <BsEnvelope className="h-6 w-6 md:mr-3" />
            <span className="hidden lg:inline">Messages</span>
          </Link>
        </li>
        <li className="md:mb-4">
          <Link href="/bookmarks" className="flex">
            <IoBookmarkOutline className="h-6 w-6 md:mr-3" />
            <span className="hidden lg:inline">Bookmarks</span>
          </Link>
        </li>
        <li className="md:mb-4">
          <Link href={`/users/${username}`} className="flex">
            <BsPerson className="h-6 w-6 md:mr-3" />
            <span className="hidden lg:inline">Profile</span>
          </Link>
        </li>
        <li className="fixed right-6 bottom-14 md:block md:right-auto md:bottom-auto md:static">
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-14 h-14 font-bold rounded-full lg:rounded-2xl lg:h-10 lg:w-full"
                onClick={() => setDialogOpen(true)}
              >
                <BsFeather className="h-6 w-6 lg:mr-3 text-white lg:hidden" />
                <p className="hidden lg:block">Post</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="top-[20vh] m-20">
              <DialogHeader>
                <DialogTitle>Write your post</DialogTitle>
              </DialogHeader>
              <form
                className="border-b-[1px] border-gray-200 p-2"
                onSubmit={onSubmitHandler}
              >
                <Textarea name="text" className="resize-none mb-3" />
                <div className="flex gap-2">
                  <Button className="w-20" type="submit">
                    Post
                  </Button>
                  <Input
                    name="media"
                    type="file"
                    className="max-w-56"
                    onChange={onMediaChangeHandler}
                  />
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
