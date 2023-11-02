export type TweetData = {
  id: number;
  account: string;
  text: string;
};

type Props = {
  tweetData: TweetData;
};

const Tweet = ({ tweetData }: Props) => {
  return (
    <article>
      <p>{tweetData.account}</p>
      <p>{tweetData.text}</p>
    </article>
  );
};

export default Tweet;
