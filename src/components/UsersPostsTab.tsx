import { ChildData, getPostsByUsername } from "@/query/tweetClient";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";

const UsersPostsTab = () => {
  const [posts, setPosts] = useState<ChildData[]>([]);

  useEffect(() => {
    getPostsByUsername("maximus").then((data) => {
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

export default UsersPostsTab;
