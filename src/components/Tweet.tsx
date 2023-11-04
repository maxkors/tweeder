import dayjs from "dayjs";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

export type User = {
  id: number;
  username: string;
  name: string;
};

export type TweetData = {
  id: number;
  user: User;
  text: string;
  comments: number;
  likes: number;
  dateTime: string;
};

type Props = {
  tweetData: TweetData;
};

const Tweet = ({ tweetData }: Props) => {
  return (
    <article className="border-b-[1px] border-gray-300 p-2">
      <div className="flex mb-1">
        <span className="mr-2 font-bold">{tweetData.user.name}</span>
        <span className="mr-2 text-gray-600">@{tweetData.user.username}</span>
        <span className="text-gray-600">
          {dayjs(tweetData.dateTime).format("H:m MMM D")}
        </span>
      </div>
      <p className="mb-2">{tweetData.text}</p>
      <div className="flex justify-around">
        <div className="flex justify-center items-center">
          <BiCommentDetail className="h-4 w-4 mr-1" />
          <span className="text-sm">{tweetData.comments}</span>
        </div>
        <div className="flex justify-center items-center">
          <AiOutlineHeart className="h-4 w-4 mr-1" />
          <span className="text-sm">{tweetData.likes}</span>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
