import { Button } from "@/components/ui/button";
import Link from "next/link";

const Main = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="mb-6 mt-[25vh]">
        <p className="text-2xl font-bold mb-2">Join today.</p>
        <Link href="/signup">
          <Button className="w-[17rem]">Create account</Button>
        </Link>
      </section>
      <section>
        <p className="font-bold mb-2">Already have an account?</p>
        <Link href="/signin">
          <Button className="w-[17rem]">Sign in</Button>
        </Link>
      </section>
    </main>
  );
};

export default Main;
