"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import SubscriptionPosts from "./SubscriptionPosts";
import RecommendedPosts from "./RecommendedPosts";

const Feed = () => {

  return (
    <div className="min-h-screen w-[100%] md:w-[37.5rem] md:border-x-[1px] border-gray-300">
      <Tabs defaultValue="subscription" className="mt-2 w-[100%]">
        <TabsList className="mx-2" style={{ width: "calc(100% - 1rem)" }}>
        <TabsTrigger value="recommended" className="w-[50%]">
            For you
          </TabsTrigger>
          <TabsTrigger value="subscription" className="w-[50%]">
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recommended">
          <RecommendedPosts />
        </TabsContent>
        <TabsContent value="subscription">
          <SubscriptionPosts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Feed;
