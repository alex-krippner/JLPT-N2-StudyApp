import * as React from "react";
import { AuthProvider } from "../context/AuthProvider";
import { Layout } from "./Layout";

export function AuthLayout() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}