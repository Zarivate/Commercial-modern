import Nav from "@/components/Nav";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const { data: session } = useSession();

  const [toggleNav, setToggleNav] = useState(false);

  if (!session) {
    return (
      <div className="bg-bgAdmin w-screen h-screen flex items-center">
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
      <div className="bg-bgAdmin min-h-screen">
        <div className="block md:hidden flex items-center p-2">
          <button onClick={() => setToggleNav(!toggleNav)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="flex grow justify-center mr-6">
            <Logo />
          </div>
        </div>
        <div className="flex">
          <Nav toggle={toggleNav} />
          <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-2">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
