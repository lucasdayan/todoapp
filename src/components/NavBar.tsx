import Link from "next/link";
export default function NavBar() {
  return (
    <nav className="flex flex-row items-center h-12 px-4 border-b bg-white w-full dark:bg-gray-950 justify-center py-9">
      <Link className="mr-4 flex items-center gap-2" href="/">
        <span className="font-semibold">My personal task manager</span>
      </Link>
      
    </nav>
  );
}
