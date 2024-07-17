"use client";

import Navigation from "@/components/Navigation";
import { usePathname, useRouter } from "next/navigation";
import { SyntheticEvent } from "react";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
};


const UsersLayout = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const username = pathname.split("/")[2];

  const onBackArrowClick = (event: SyntheticEvent<HTMLElement>) => {
    router.back();
  };
  
  return (
    <div className="flex justify-center">
      <Navigation />
      <div className="min-h-screen w-[100%] md:w-[37.5rem] md:border-x-[1px] border-gray-300">
      <header className="h-11 flex items-center border-b-[1px] border-gray-200 p-2">
          <div onClick={onBackArrowClick}>
            <FaArrowLeft className="h-5 w-5 ml-2 mr-5 hover:cursor-pointer" />
          </div>
          <p className="font-bold text-lg">{username}</p>
        </header>
        {children}
      </div>
    </div>
  );
};

export default UsersLayout;
