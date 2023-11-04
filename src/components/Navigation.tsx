import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { BsPerson, BsEnvelope } from "react-icons/bs";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 w-[100%] border-t-[1px] border-gray-300 p-2 md:px-4 md:static md:w-auto md:border-none">
      <ul className="flex justify-around md:justify-normal md:block">
        <li className="md:mb-4">
          <Link href="/home" className="flex">
            <AiOutlineHome className="h-6 w-6 md:mr-3" />
            <span className="hidden lg:inline">Home</span>
          </Link>
        </li>
        <li className="md:mb-4">
          <Link href="/messages" className="flex">
            <BsEnvelope className="h-6 w-6 md:mr-3" />
            <span className="hidden lg:inline">Messages</span>
          </Link>
        </li>
        <li className="md:mb-4">
          <Link href="/profile" className="flex">
            <BsPerson className="h-6 w-6 md:mr-3" />
            <span className="hidden lg:inline">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
