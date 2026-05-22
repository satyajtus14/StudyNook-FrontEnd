"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { FaRegMehRollingEyes } from "react-icons/fa";
import { LuLayoutList, LuCalendarCheck, LuLogOut, LuChevronDown } from "react-icons/lu";
import "animate.css";
import { authClient } from "@/lib/auth-client";

// ── Constants ─────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/my-listings", label: "My Listings" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/add-room", label: "Add Room" },
];

// ── Helpers ───────────────────────────────────────────────────────

// Reusable avatar — shows image or initial fallback
function UserAvatar({ src, name, size = 40, ringColor = "ring-olive-600" }) {
  return src ? (
    <Image
      src={src}
      alt={name || "User"}
      width={size}
      height={size}
      className={`rounded-full object-cover ring-2 ${ringColor}`}
    />
  ) : (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-olive-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
    >
      {name?.charAt(0).toUpperCase() || "U"}
    </div>
  );
}

// Nav link class — active vs inactive
function navLinkClass(isActive) {
  return `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
    isActive
      ? "bg-gray-800 text-white dark:bg-white dark:text-olive-600"
      : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-olive-700"
  }`;
}

// ── ThemeSwitch ───────────────────────────────────────────────────
export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-olive-700 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark"
        ? <Sun className="w-5 h-5 text-yellow-400" />
        : <Moon className="w-5 h-5 text-gray-700" />
      }
    </button>
  );
}

// ── ProfileDropdown ───────────────────────────────────────────────
function ProfileDropdown({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative" ref={ref}>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border border-gray-200 dark:border-olive-500 bg-white dark:bg-olive-700 hover:shadow-md transition-shadow"
      >
        <UserAvatar src={user.image} name={user.name} size={32} />
        <span className="text-sm font-semibold text-gray-800 dark:text-white hidden sm:block max-w-[100px] truncate">
          {user.name}
        </span>
        <LuChevronDown className={`w-4 h-4 text-gray-500 dark:text-white transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl z-50 overflow-hidden">

          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <UserAvatar src={user.image} name={user.name} size={40} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>

          {/* Menu links */}
          {/* <div className="py-1">
            <Link
              href="/my-listings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <LuLayoutList className="w-4 h-4 text-olive-600" />
              My Listings
            </Link>
            <Link
              href="/my-bookings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <LuCalendarCheck className="w-4 h-4 text-olive-600" />
              My Bookings
            </Link>
          </div> */}

          {/* Logout */}
          <div className="border-t border-gray-100 dark:border-gray-800 py-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LuLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────
const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-gray-300 dark:bg-olive-600 border-b dark:border-olive-700 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Top bar */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/logo.png" alt="StudyNook Logo" width={120} height={120} className="w-20 h-20 object-contain" />
            <span className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
              StudyN
              <FaRegMehRollingEyes className="text-black animate-spin" />
              <FaRegMehRollingEyes className="text-black animate-spin" />k
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={navLinkClass(pathname === href)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeSwitch />
            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-semibold border border-gray-200 dark:border-white text-gray-700 dark:text-white rounded-md hover:bg-gray-600 hover:text-white dark:hover:bg-olive-700 transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-semibold text-white dark:text-olive-600 bg-gray-800 dark:bg-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeSwitch />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen
                ? <X className="w-7 h-7 text-gray-700 dark:text-white" />
                : <Menu className="w-7 h-7 text-gray-700 dark:text-white" />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 dark:bg-olive-600">

            {/* Nav links */}
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block ${navLinkClass(pathname === href)}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile user section */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-olive-500">
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <UserAvatar src={user.image} name={user.name} size={40} ringColor="ring-white" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-olive-200">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      await authClient.signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                  >
                    <LuLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center px-4 py-3 border-2 border-gray-400 dark:border-white text-gray-700 dark:text-white rounded-md font-semibold hover:bg-gray-400 dark:hover:bg-olive-700 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center px-4 py-3 bg-gray-800 dark:bg-white text-white dark:text-olive-600 rounded-md font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

      </nav>
    </header>
  );
};

export default Navbar;