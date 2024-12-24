import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-2xl">Welcome to Task Task-Management-Application</h1> 
      <Link href="/task" className="bg-blue-500 px-5 py-3">Task Management</Link>
    </div>

  );
}
