import Link from "next/link";
import Image from "next/image";
import { HiClipboardList, HiLogin, HiUserAdd } from "react-icons/hi";
import AuthButton from "@/components/Auth/AuthButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-zinc-900 text-white shadow-lg">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:opacity-90">
            Twiligit Sols
          </Link>
          <div className="flex space-x-6">
            <Link
              href="/task"
              className="flex items-center space-x-2 hover:text-yellow-200 transition-colors duration-300"
            >
              <HiClipboardList className="text-lg" />
              <span className="hidden md:block">Task Management</span>
            </Link>
            <Link
              href="/auth/signin"
              className="flex items-center space-x-2 hover:text-yellow-200 transition-colors duration-300"
            >
              <HiLogin className="text-lg" />
              <span className="hidden md:block">Sign In</span>
            </Link>
            <Link
              href="/auth/signup"
              className="flex items-center space-x-2 hover:text-yellow-200 transition-colors duration-300"
            >
              <HiUserAdd className="text-lg" />
              <span className="hidden md:block">Sign Up</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center bg-gray-50 p-6">
        <div className="flex flex-col justify-center mx-auto text-center space-y-8 item-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome to Task Management Application
          </h1>
          <p className="text-lg text-gray-600">
            Manage your tasks effortlessly with Twiligit Sols. Organize, track, and complete your projects with ease.
          </p>
          <div className="flex justify-center">
            <Image
              src="/197998491777Tech_Assistant.gif"
              alt="Tech Assistant"
              width={300}
              height={300}
            />
          </div>

          <div className="flex flex-col space-y-4 justify-center items-center">
            <Link
              href="/task"
              className="flex items-center justify-center space-x-2 bg-zinc-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-zinc-800 transition-all duration-300"
            >
              <HiClipboardList className="text-lg" />
              <span>Go to Task Management</span>
            </Link>
            <Link
              href="/auth/signup"
              className="flex items-center justify-center space-x-2 bg-purple-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300"
            >
              <HiUserAdd className="text-lg" />
              <span>Sign Up</span>
            </Link>
            <AuthButton/>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Twiligit Sols. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link
              href="https://github.com/Muhammad-Taha-Qader"
              target="_blank"
              className="hover:text-yellow-200 transition-colors duration-300"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/Muhammad-taha-07a1a0228"
              target="_blank"
              className="hover:text-yellow-200 transition-colors duration-300"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
