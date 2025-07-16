"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UserControl from "@/components/user-control";
import { useScroll } from "@/hooks/use-scroll";

const Navbar = () => {
  const isScrolled = useScroll(10);

  return (
    <nav
      className={cn(
        "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent",
        isScrolled && "bg-red-500 border-border"
      )}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="Swiftly" width={24} height={24} />
          <span className="font-semibold text-lg">Swiftly</span>
        </Link>

        <SignedOut>
          <div className="flex gap-2">
            <SignInButton>
              <Button size={"sm"}>
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button variant={"outline"} size={"sm"}>
                Sign up
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <span className="flex items-center gap-4">
            <UserControl showName={true} />
          </span>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
