import Navigation from "@/components/Navigation";
import ChatList from "@/components/ChatList";

type Props = {
  children: React.ReactNode
};

const ChatsLayout = ({ children }: Props) => {

  return (
    <div className="flex justify-center">
      <Navigation />
      <div className="flex min-h-screen w-[100%] md:w-[50rem] md:border-x-[1px] border-gray-200">
        <ChatList />
        {children}
      </div>
    </div>
  );
};

export default ChatsLayout;
