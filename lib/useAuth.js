//Custom Hook to Protected Frontend Pages
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) 
    {
      router.push("/auth/signin"); // Redirect to login if no token
    } 
    else 
    {
        setIsAuthorized(true);
    }
  }, [router]);

  return isAuthorized;
};

export default useAuth;
