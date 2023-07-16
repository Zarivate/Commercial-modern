import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex  items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-blue-700 min-h-screen flex">
        <Nav />
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-2">
          {children}
        </div>
      </div>
    );
  }
}
