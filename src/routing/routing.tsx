import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../pages/Home";
import Settings from "../pages/Settings";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/TWA-Template" element={<Home />} />
      <Route path="/Settings" element={<Settings />} />
    </>
  )
);
