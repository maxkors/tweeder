import { ChildData, getLikedPosts, getPostsByUsername } from "@/query/tweetClient";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";

const LikedPostsTab = () => {
  const [posts, setPosts] = useState<ChildData[]>([]);

  useEffect(() => {
    getLikedPosts("maximus").then((data) => {
      setPosts(data);
    });
  }, []);

  return (
    <div>
      {posts.map((post, id) => (
        <Tweet tweetData={post} key={id} />
      ))}
    </div>
  );
};

export default LikedPostsTab;
