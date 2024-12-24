"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateToken } from "@/lib/tokenHelper";
import { HiLogin, HiLogout } from "react-icons/hi";

const AuthButton = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by checking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  // Handle logout
  const handleLogout = () => {
    // localStorage.removeItem("token"); // Remove the token
    updateToken(null); // Remove token and notify components
    setIsLoggedIn(false); // Update the login state
    router.push("/auth/signin"); // Redirect to the sign-in page
  };

  return (
    <div>
      {isLoggedIn ? (
        // Show Logout button if user is logged in
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x- bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg shadow transition-all duration-300"

        >
          <HiLogout className="text-lg" />
          <span>Sign Out</span>
        </button>
      ) : (
        // Show Login link if user is not logged in
        <Link
          href="/auth/signin"
          className="flex items-center justify-center space-x- bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow transition-all duration-300"
        >
          <HiLogin className="text-lg" />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
