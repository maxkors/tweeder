import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  return (
    <div className="flex justify-center">
      <div className="w-80 mt-[20vh]">
        <p className="text-2xl font-bold mb-3">Create your account</p>
        <form>
          <Input type="text" placeholder="Name" className="mb-3" />
          <Input type="email" placeholder="Email" className="mb-3" />
          <Input type="text" placeholder="Username" className="mb-3" />
          <Input type="password" placeholder="Password" className="mb-3" />
          <Button type="submit" className="w-[100%]">
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
