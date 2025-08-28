"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Link from "next/link";

const Navbar = () => {
    return (
        <>
            <div>Logo</div>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <Link href="/">Search</Link>
                    </li>
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/pricing">Pricing</Link>
                    </li>
                </ul>
            </nav>
            <div className=" flex justify-center items-center">
                <SignedOut>
                    <SignInButton mode="modal" />
                </SignedOut>
                <SignedIn>
                    <UserButton
                        userProfileMode="navigation"
                        userProfileUrl="/account"
                    ></UserButton>
                </SignedIn>
            </div>
        </>
    );
};

export default Navbar;
