import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignIn = () => {
  return (
    <div className="flex justify-center">
      <div className="w-80 mt-[20vh]">
        <p className="text-2xl font-bold mb-3">Sign in to Tweeder</p>
        <form>
          <Input type="text" placeholder="Username" className="mb-3" />
          <Input type="password" placeholder="Password" className="mb-3" />
          <Button type="submit" className="w-[100%]">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
