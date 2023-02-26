import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import KanjiView from "../../features/kanji/components/KanjiView";
import { Home } from "../components/HomeView";
import { Layout } from "../components/Layout";

export const monRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="kanji" element={<KanjiView />} />
    </Route>,
  ),
);
