import { ChildData, getPostsByUsername } from "@/query/tweetClient";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";

type Props = {
  username: string;
};

const UsersPostsTab = ({ username }: Props) => {
  const [posts, setPosts] = useState<ChildData[]>([]);

  useEffect(() => {
    getPostsByUsername(username).then((data) => {
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
