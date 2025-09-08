import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex items-center justify-center w-2/5 p-8">
        {children}
      </div>
      <aside className="items-center justify-center hidden w-3/5 p-8 lg:flex">
        <Image
          src="/deliveryman.webp"
          alt="Delivery man"
          width={800}
          height={600}
          className="object-cover w-full h-full rounded-2xl"
          priority
        />
      </aside>
    </div>
  );
};

export default AuthLayout;
