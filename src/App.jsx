import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
// hooks
import { useState } from "react";

// components
import About from "./components/aboutPageComponents/about.jsx";

// layouts
import RootLayout from "./layouts/RootLayout.jsx";
import RecorderLayout from "./layouts/recorderLayout.jsx";
import HomeLayout from "./layouts/HomeLayout.jsx";

import RecorderContextProvider from "./store/recorder-context.jsx";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<About />} />
        <Route path="home" element={<HomeLayout />}  />
         <Route  path="recorder" element={ <RecorderLayout /> } />
      </Route>
    )
  );

  return (
    <RecorderContextProvider>
      <RouterProvider router={router} />
    </RecorderContextProvider>
  );
}

export default App;
