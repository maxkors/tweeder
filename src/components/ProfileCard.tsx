"use client";

import UserClient, { Profile } from "@/query/userClient";
import ChatClient from "@/query/chatClient";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersPostsTab from "./UsersPostsTab";
import LikedPostsTab from "./LikedPostsTab";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

type Props = {
  data: Profile;
};

const ProfileCard = ({ data }: Props) => {
  const router = useRouter();
  const username = useSelector((state: RootState) => state.profile.username);
  const [isFollowed, setIsFollowed] = useState<boolean>(data.isFollowed);
  const [followersCounter, setFollowersCounter] = useState<number>(
    data.subscribersCount
  );

  const onSignOutClickHandler = () => {
    localStorage.removeItem("jwt_token");
    router.push("/signin");
  };

  const onFollowClickHandler = () => {
    UserClient.follow(data.username);
    setIsFollowed(true);
    setFollowersCounter((prev) => prev + 1);
  };

  const onUnfollowClickHandler = () => {
    UserClient.unfollow(data.username);
    setIsFollowed(false);
    setFollowersCounter((prev) => prev - 1);
  };

  const followButton = isFollowed ? (
    <Button className="mt-3 mx-2" onClick={onUnfollowClickHandler}>
      Unfollow
    </Button>
  ) : (
    <Button className="mt-3 mx-2" onClick={onFollowClickHandler}>
      Follow
    </Button>
  );

  const onMessageButtonClick = () => {
    ChatClient.createChat(data.username).then((chat) =>
      router.push(`/chats/${chat.id}`)
    );
  };

  useEffect(() => {console.log(data)}, [])

  return (
    <div>
      <div className="flex p-2">
        <Avatar className="mr-2">
          <AvatarImage src={data.avatarUrl} />
          <AvatarFallback>{data.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="leading-[1.3rem]">
          <p className="font-bold mx-2">{data.name}</p>
          <p className="text-gray-500 mx-2">@{data.username}</p>
        </div>
      </div>

      <p className="mx-2">
        <Link
          href={`/users/${data.username}/following`}
          className="mr-3 hover:underline"
        >
          <b>{data.subscriptionsCount}</b> Following
        </Link>
        <Link
          href={`/users/${data.username}/followers`}
          className="hover:underline"
        >
          <b>{followersCounter}</b> Followers
        </Link>
      </p>
      <div className="flex">
        {data.username === username && (
          <>
            <Button className="mt-3 mx-2" onClick={onSignOutClickHandler}>
              Sign out
            </Button>
            <Button
              className="mt-3 mx-2"
              onClick={() => router.push(`/users/${username}/profile`)}
            >
              Edit profile
            </Button>
          </>
        )}
        {data.username !== username && followButton}
        {data.username !== username && (
          <Button className="mt-3 mx-2" onClick={onMessageButtonClick}>
            Message
          </Button>
        )}
      </div>
      <Tabs defaultValue="posts" className="mt-2 w-[100%]">
        <TabsList className="mx-2" style={{ width: "calc(100% - 1rem)" }}>
          <TabsTrigger value="posts" className="w-[50%]">
            Posts
          </TabsTrigger>
          <TabsTrigger value="likes" className="w-[50%]">
            Likes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <UsersPostsTab username={data.username} />
        </TabsContent>
        <TabsContent value="likes">
          <LikedPostsTab username={data.username} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileCard;
