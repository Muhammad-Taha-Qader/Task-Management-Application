"use client";
import useAuth from "@/lib/useAuth"; // Custom hook for authentication

export default function Task() {
    const isAuthenticated = useAuth(); // Redirects to login if user is not authenticated
    return (
      <div className="">
        <h1 className="text-2xl">Task-Management Panel</h1> 
        <p>{isAuthenticated}</p>
      </div>
  
    );
  }
  