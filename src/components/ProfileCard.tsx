"use client";

import UserClient, { Profile } from "@/query/userClient";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersPostsTab from "./UsersPostsTab";
import LikedPostsTab from "./LikedPostsTab";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import Link from "next/link";

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

  const messageButton = (
    <Link href={`/messages/?username=${data.username}`} className="flex">
      <Button className="mt-3 mx-2">Message</Button>
    </Link>
  );

  return (
    <div>
      <p className="font-bold mx-2">{data.name}</p>
      <p className="text-gray-500 mx-2">@{data.username}</p>
      <p className="mx-2">
        <span className="mr-3">
          <b>{data.subscriptionsCount}</b> Following
        </span>
        <span>
          <b>{followersCounter}</b> Followers
        </span>
      </p>
      <div className="flex">
        {data.username === username && (
          <Button className="mt-3 mx-2" onClick={onSignOutClickHandler}>
            Sign out
          </Button>
        )}
        {data.username !== username && followButton}
        {data.username !== username && messageButton}
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
