"use client";

import { Profile } from "@/query/userClient";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersPostsTab from "./UsersPostsTab";
import LikedPostsTab from "./LikedPostsTab";

type Props = {
  data: Profile;
};

const ProfileCard = ({ data }: Props) => {
  const router = useRouter();

  const onButtonClickHandler = () => {
    localStorage.removeItem("jwt_token");
    router.push("/signin");
  };

  return (
    <div className="min-h-screen w-[100%] md:w-[37.5rem] md:border-x-[1px] border-gray-300">
      <p className="font-bold mx-2">{data.name}</p>
      <p className="text-gray-500 mx-2">@{data.username}</p>
      <p className="mx-2">
        <span className="mr-3">
          <b>{data.subscriptionsCount}</b> Following
        </span>
        <span>
          <b>{data.subscribersCount}</b> Followers
        </span>
      </p>
      <Button className="mt-3 mx-2" onClick={onButtonClickHandler}>
        Sign out
      </Button>
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
