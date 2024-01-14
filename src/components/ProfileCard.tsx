import { Profile } from "@/query/userClient";

type Props = {
  data?: Profile;
};

const ProfileCard = ({ data }: Props) => {
  return (
    <div className="min-h-screen w-[100%] md:w-[37.5rem] md:border-x-[1px] border-gray-300 p-2">
      <p className="font-bold">{data?.name}</p>
        <p className="text-gray-500">@{data?.username}</p>
      <p>
        <span className="mr-3">
          <b>{data?.subscriptionsCount}</b> Following
        </span>
        <span>
          <b>{data?.subscribersCount}</b> Followers
        </span>
      </p>
    </div>
  );
};

export default ProfileCard;
