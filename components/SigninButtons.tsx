"use client";
import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

const SigninButtons = () => {
  return (
    <>
      <h1 className="text-center mt-8">Sign in</h1>
      <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
        <button
          className="flex items-center border p-4 gap-4 rounded-full hover:bg-slate-100/25 transition"
          onClick={() => signIn("github")}
        >
          <span>
            <Image
              src={"/github-logo.svg"}
              width={30}
              height={30}
              alt="github-logo"
            />
          </span>
          Sign in with Github
        </button>
        <button
          className="flex items-center border p-4 gap-4 rounded-full hover:bg-slate-100/25 transition"
          onClick={() => signIn("google")}
        >
          <span>
            <Image
              src={"/google-logo.svg"}
              width={30}
              height={30}
              alt="github-logo"
            />
          </span>
          Sign in with Google
        </button>
      </div>
    </>
  );
};

export default SigninButtons;
