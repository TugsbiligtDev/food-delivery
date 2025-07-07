const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex items-center justify-center w-2/5 p-8">
        {children}
      </div>
      <div className="items-center justify-center hidden w-3/5 p-8 lg:flex">
        <img
          src="/deliveryman.jpg"
          alt="Delivery man"
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
