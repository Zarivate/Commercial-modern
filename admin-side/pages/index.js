import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
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
  }
  return (
    <>
      <div className="bg-blue-900 min-h-screen">
        <Nav />
        Signed in as {session.user.email}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </>
  );
}
