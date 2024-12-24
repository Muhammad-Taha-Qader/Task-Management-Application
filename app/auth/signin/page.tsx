"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateToken } from "@/lib/tokenHelper";


const SignIn = () => {
  const [email, setEmail] = useState("");        
  const [password, setPassword] = useState("");   
  const [loading, setLoading] = useState(false);  // State to manage loading spinner or button disable state
  const [error, setError] = useState("");         
  const router = useRouter();                    

  // Check if user is already logged in by looking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, redirect to homepage
      router.push("/");
    }
  }, [router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent page reload on form submission

    setLoading(true); 
    setError("");    

    try {
      // Send a POST request to the backend API for sign-in
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Send email and password in the request body
      });

      const data = await res.json();  // Parse the response from the server

      if (res.ok) {
        // On successful login, store the JWT token in localStorage
        updateToken(data.token); // Save token and notify components
        router.push("/");
      } else {
        // If login fails, set the error state with the message from the backend
        setError(data.message || "Login failed");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // If there is any error during the fetch request, set the error state
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);  // Set loading to false after the request is complete
    }
  };

  return (
    <div className="flex  flex-col h-lvh items-center justify-center">
    <div className=" max-w-md mx-auto bg-black p-4 ">
      <h1 className="text-2xl font-semibold text-center mb-6 text-zinc-100">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Update email state on change
          placeholder="Email" 
          required
          className="w-full p-2 border border-zinc-300 rounded-md shadow-sm text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />

        {/* Password input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Update password state on change
          placeholder="Password"
          required
          className="w-full p-2 border border-zinc-300 rounded-md shadow-sm text-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />

        {/* Error message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit button */}
        <button
          type="submit"
          // className="w-full p-2 bg-blue-500 text-white rounded-md"
          className={`w-full py-3 text-white rounded-md ${loading ? "bg-gray-400" : "bg-zinc-400 hover:bg-zinc-600"} focus:outline-none`}
          disabled={loading}  // Disable button while the request is in progress
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Do not have an account?{" "}
        <Link href="signup" className="text-zinc-500 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
    </div>
  );
};

export default SignIn;
