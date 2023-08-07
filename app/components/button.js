"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Button() {
  return <button className='btn btn-base-content mb-4 'onClick={() => signOut()}>Sign out</button>;
}
