import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Welcome to Task Management Application
      </h1> 
      <Link
        href="/task"
        className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
      >
        Go to Task Management
      </Link>
    </div>
  );
}
