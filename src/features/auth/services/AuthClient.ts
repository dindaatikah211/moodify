import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

const signInWith = (callbackURL: string) =>
  authClient.signIn.social({ provider: "google", callbackURL });

export const signInWithGoogle = () => signInWith("/chat");

export const reauthenticate = () => signInWith("/account");

export const signOut = () => authClient.signOut();

export const deleteAccount = () => authClient.deleteUser();