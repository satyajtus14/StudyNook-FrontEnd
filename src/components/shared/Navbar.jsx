"use client";

import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { FaRegMehRollingEyes } from "react-icons/fa";
import "animate.css";
import { authClient } from "@/lib/auth-client";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}
const Navbar = () => {
  const { data: session } = authClient.useSession();

  // console.log("Session:", session);
  const user = session?.user;

  // console.log("User:", user);
  // console.log("User image:", user?.image);

  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/my-listings", label: "My Listings" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/add-room", label: "Add Room" },
  ];

  return (
    // ✅ Header background: white in light, olive-600 in dark
    <header className="sticky top-0 z-50 bg-white border-gray-300 dark:bg-olive-600 border-b  dark:border-olive-700  shadow-sm">
      <nav className="max-w-7xl mx-auto px-4  sm:px-6">
        {/* Top Navbar */}
        <div className="flex items-center justify-between ">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <Image
                src={"/assets/logo.png"}
                alt={"StudyNook Logo"}
                width={120}
                height={120}
              />

              <span className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                <div className="flex items-center">
                  StudyN
                  <FaRegMehRollingEyes className="text-black animate-spin" />
                  <FaRegMehRollingEyes className="text-black animate-spin" />k
                </div>
              </span>
            </div>
          </Link>
          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                    pathname === href
                      ? // ✅ Active: dark bg in light mode, white bg in dark mode
                        "bg-gray-800 text-white dark:bg-white dark:text-olive-600"
                      : // ✅ Inactive: gray text in light, white text in dark
                        "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-olive-700"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth + ThemeSwitch */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeSwitch />
            {user ? (
              <>
                {/* <Avatar 
                className="w-9 h-9" 
                src={user.image || "/assets/default-avatar.png"} 
                alt={user.name || "User Avatar"} 
                 /> */}
                <Avatar>
                  <Avatar.Image
                    alt={user.name || "User Avatar"}
                    src={user.image || "/assets/default-avatar.png"}
                  />
                  <Avatar.Fallback>{user.name?.charAt(0) || "U"}</Avatar.Fallback>
                </Avatar>

                <span className="text-sm font-semibold text-blue-900 dark:text-white">
                  {user.name || "User"}
                </span>
                {/* ✅ Logout: red outlined in light, white outlined in dark */}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => authClient.signOut()}
                  className="font-semibold border-2 border-red-500 text-white hover:bg-red-800 hover:text-white dark:border-white dark:text-white dark:hover:bg-gray-100 dark:hover:text-olive-600 transition-colors"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* ✅ Login: normal in light, white outlined in dark */}
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold border border-gray-200 dark:border-white text-gray-700 dark:text-white rounded-md hover:bg-gray-600 hover:text-white dark:hover:bg-olive-700 transition-colors"
                >
                  Login
                </Link>
                {/* ✅ Register: dark bg in light, white bg in dark */}
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white dark:text-olive-600 bg-gray-800 dark:bg-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeSwitch />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-7 h-7 text-gray-700 dark:text-white" />
              ) : (
                <Menu className="w-7 h-7 text-gray-700 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          // ✅ Mobile dropdown also olive-600 in dark
          <div className="lg:hidden pb-6 dark:bg-olive-600">
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                      pathname === href
                        ? "bg-gray-800 text-white dark:bg-white dark:text-olive-600"
                        : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-olive-700"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/login"
                className="w-full text-center px-4 py-3 border-2 border-gray-400 dark:border-white text-gray-700 dark:text-white rounded-md font-semibold hover:bg-gray-400 dark:hover:bg-olive-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="w-full text-center px-4 py-3 bg-gray-800 dark:bg-white text-white dark:text-olive-600 rounded-md font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
