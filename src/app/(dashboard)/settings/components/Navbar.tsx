"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const navMenu = [
    {
      name: "Business Setup",
      path: "/settings",
    },
    {
      name: "Pages Setup",
      path: "/settings/pages-setup",
    },
    {
      name: "System Setup",
      path: "/settings/system-setup",
    },
    {
      name: "Third Party Setup",
      path: "/settings/third-party-setup",
    },
    {
      name: "Social Media Setup",
      path: "/settings/social-media-setup",
    },
  ];

  const isActive = (path: string) => {
    return pathname === path
      ? "text-signature border-signature"
      : "text-primary/75 hover:text-signature border-transparent";
  };
  return (
    <div className="w-full h-16 flex items-center gap-8 bg-background px-4 shadow rounded-lg">
      {navMenu.map(({ name, path }) => (
        <Link
          key={path}
          href={path}
          className={`font-bold capitalize border-b-2 pb-1 ${isActive(
            path
          )} transition-colors`}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
