import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { AuthenticationGuard } from "../components/AuthenticationGuard";
import { AuthLayout } from "../components/AuthLayout";
import { FullScreenLoadingIndicator } from "../components/FullScreenLoadingIndicator";
import { Home } from "../components/HomeView";
import KanjiView from "../../features/kanji/components/KanjiView";
import { VocabView } from "../../features/vocab/components/VocabView";

export const monRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthLayout />}>
      <Route index element={<Home />} />
      <Route path="/callback" element={<FullScreenLoadingIndicator />} />
      <Route
        path="kanji"
        element={
          <AuthenticationGuard
            component={KanjiView}
            redirectComponent={() => <FullScreenLoadingIndicator />}
          />
        }
      />
      <Route
        path="vocab"
        element={
          <AuthenticationGuard
            component={VocabView}
            redirectComponent={() => <FullScreenLoadingIndicator />}
          />
        }
      />
    </Route>,
  ),
);
