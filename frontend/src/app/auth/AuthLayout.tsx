const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-2/5 flex items-center justify-center p-8">
        {children}
      </div>
      <div className="hidden lg:flex w-3/5 items-center justify-center p-8">
        <img
          src="/deliveryman.jpg"
          alt="Delivery man"
          className="w-full h-full rounded-2xl object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
