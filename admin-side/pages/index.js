import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        {/* Didn't know overflow-hidden could be used to round out image icons as well */}
        <div className="flex bg-gray-400 gap-1 text-black rounded-lg overflow-hidden">
          <img
            src={session?.user?.image}
            alt="user-profile"
            className="w-6 h-6"
          />
          <span className="px-2">{session.user.email}</span>
        </div>
      </div>
    </Layout>
  );
}
