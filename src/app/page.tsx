import { Button } from "@/components/ui/button";
import Link from "next/link";

const Main = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/home">
        <Button>Sign in</Button>
      </Link>
    </main>
  );
};

export default Main;
