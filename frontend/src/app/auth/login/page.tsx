import AuthImage from "@/components/auth/AuthImage";
import Login from "@/components/auth/Login";
const page = () => {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-2/5 flex items-center justify-center p-8 lg:p-16">
        <Login />
      </div>
      <div className="hidden lg:flex w-3/5 items-center justify-center p-8">
        <AuthImage />
      </div>
    </div>
  );
};

export default page;
