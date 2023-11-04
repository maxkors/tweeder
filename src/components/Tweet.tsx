import dayjs from "dayjs";

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
        <span className="mr-2">{tweetData.user.name}</span>
        <span className="mr-2">@{tweetData.user.username}</span>
        <span>{dayjs(tweetData.dateTime).format("H:m MMM D")}</span>
      </div>
      <p className="mb-1">{tweetData.text}</p>
      <div className="flex justify-around">
        <span>✉ {tweetData.comments}</span>
        <span>♡ {tweetData.likes}</span>
      </div>
    </article>
  );
};

export default Tweet;
