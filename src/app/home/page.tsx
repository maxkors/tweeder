import Feed from "@/components/Feed";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import HydratedFeed from "@/query/HydratedFeed";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Navigation />
      {/* <HydratedFeed /> */}
      <Feed />
      <Sidebar />
    </div>
  );
}
