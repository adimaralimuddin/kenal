import Link from "next/link";
import React from "react";

export default function LinkCreateAccount({ className, ...props }) {
  return (
    <Link href="/create_account">
      <h3
        className={
          "text-primary-light dark:text-primary-dark hover:text-indigo-500 ddark:text-indigo-400 dark:hover:text-indigo-500 text-center cursor-pointer ring-1d " +
          className
        }
        {...props}
      >
        create account
      </h3>
    </Link>
  );
}
