import AuthImage from "@/components/auth/AuthImage";
import PasswordReset from "@/components/auth/PasswordReset";

const page = () => {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-2/5 flex items-center justify-center p-8 lg:p-16">
        <PasswordReset />
      </div>
      <div className="hidden lg:flex w-3/5 items-center justify-center p-8">
        <AuthImage />
      </div>
    </div>
  );
};

export default page;
