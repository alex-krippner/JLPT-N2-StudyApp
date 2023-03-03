import * as React from "react";
import { AuthProvider } from "../context/AuthProvider";
import { Layout } from "./Layout";

export const AuthLayout = () => (
  <AuthProvider>
    <Layout />
  </AuthProvider>
);
