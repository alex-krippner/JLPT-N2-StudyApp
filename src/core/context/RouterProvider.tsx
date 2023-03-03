import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AuthenticationGuard } from "../components/AuthenticationGuard";
import { AuthLayout } from "../components/AuthLayout";
import { CallbackPage } from "../components/CallbackPage";
import { Home } from "../components/HomeView";
import KanjiView from "../../features/kanji/components/KanjiView";

export const monRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthLayout />}>
      <Route index element={<Home />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route
        path="kanji"
        element={<AuthenticationGuard component={KanjiView} />}
      />
    </Route>,
  ),
);
