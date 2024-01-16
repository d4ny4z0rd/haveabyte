"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { status, data: session } = useSession();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    if (!isPopupVisible) {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <div className="flex justify-between pb-4 border-b mb-4 relative">
      <div>
        <Link href={"/"}>
          <h1 className="text-4xl font-bold tracking-tighter text-dark">
            have a byte
          </h1>
        </Link>
        <p className="text-sm ">
          <br /> One byte at a time.
        </p>
      </div>
      {status === "authenticated" ? (
        <>
          <div
            ref={popupRef}
            className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex-col gap-2 text-right min-w-[160px] ${
              isPopupVisible ? "flex" : "hidden"
            }`}
          >
            <div className="font-bold">{session?.user?.name}</div>
            <div>{session?.user?.email}</div>
            <Link
              href={"/dashboard"}
              className="hover:underline"
              onClick={() => setIsPopupVisible(false)}
            >
              Dashboard
            </Link>
            <Link
              href={"/create-post"}
              className="hover:underline"
              onClick={() => setIsPopupVisible(false)}
            >
              Create Post
            </Link>
            <button onClick={() => signOut()} className="btn">
              Sign Out
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <Link
              href={"/create-post"}
              className="hidden md:flex gap-2 items-center mr-6"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <span>Create New</span>
            </Link>
            <Image
              src={session?.user?.image || ""}
              width={36}
              height={36}
              alt="Profile Image"
              className="rounded-full cursor-pointer"
              onClick={() => setIsPopupVisible((prev) => !prev)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link href={"/sign-in"} className="btn">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
