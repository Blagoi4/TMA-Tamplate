import "@twa-dev/sdk";
import { router } from './routing/routing';
import React from "react";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;