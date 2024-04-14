import dayjs from "dayjs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ChildData } from "@/query/tweetClient";

type Props = {
  data?: ChildData;
};

const Comment = ({ data }: Props) => {
  return (
    <article className="border-b-[1px] border-gray-200 p-2 hover:bg-gray-50 hover:cursor-pointer">
      <div className="flex mb-1">
        <span className="mr-2 font-bold">{data?.user.name}</span>
        <span className="mr-2 text-gray-600">
          @{data?.user.username}
        </span>
        <span className="text-gray-600">
          {dayjs(data?.dateTime).format("H:m MMM D")}
        </span>
      </div>
      <p className="mb-2">{data?.text}</p>
      <div className="flex justify-around">
        <div className="flex justify-center items-center">
        {data?.liked ? (
            <AiFillHeart className="h-4 w-4 mr-1" style={{ color: "red" }} />
          ) : (
            <AiOutlineHeart className="h-4 w-4 mr-1" />
          )}
          <span className="text-sm">{data?.likesCount}</span>
        </div>
      </div>
    </article>
  );
};

export default Comment;
