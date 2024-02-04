import {
  ChildData,
  getLikedPosts,
  getPostsByUsername,
} from "@/query/tweetClient";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";

type Props = {
  username: string;
};

const LikedPostsTab = ({ username }: Props) => {
  const [posts, setPosts] = useState<ChildData[]>([]);

  useEffect(() => {
    getLikedPosts(username).then((data) => {
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
