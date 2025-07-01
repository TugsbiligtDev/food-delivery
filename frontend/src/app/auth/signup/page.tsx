import AuthImage from "@/components/auth/AuthImage";
import SignUp from "@/components/auth/SignUp";

const page = () => {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-2/5 flex items-center justify-center p-8 lg:p-16">
        <SignUp />
      </div>
      <div className="hidden lg:flex w-3/5 items-center justify-center p-8">
        <AuthImage />
      </div>
    </div>
  );
};

export default page;
//todo create account der let's go darhad create password ruu shiljine
