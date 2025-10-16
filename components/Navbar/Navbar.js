"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import logo from "@/assets/logo.jpg";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <>Loading...</>;
  }

  return (
    <div className="flex h-16 w-full items-center justify-around border-b-2 border-black select-none">
      <Image
        src={logo}
        height={50}
        width={50}
        alt="logo"
        className="rounded-full"
      />
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/" scroll={false}>
              Search
            </Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/review">Review</Link>
          </li>
          <li>
            <Link href="/pricing">Pricing</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center justify-center">
        <SignedOut>
          <SignInButton mode="modal" className="cursor-pointer" />
        </SignedOut>
        <SignedIn>
          <UserButton
            userProfileMode="navigation"
            userProfileUrl="/account"
          ></UserButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
