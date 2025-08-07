import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
// hooks
import { useState } from "react";


// layouts
import RootLayout from "./layouts/RootLayout.jsx";
import RecorderLayout from "./layouts/recorderLayout.jsx";
import HomeLayout from "./layouts/HomeLayout.jsx";
import AboutLayout from "./layouts/aboutLayout.jsx";

// contexts
import RecorderContextProvider from "./store/recorder-context.jsx";
import AudioPlayerContextProvider from "./store/audioPlayer-context.jsx";

function App() {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<AboutLayout />} />
        <Route path="home" element={<HomeLayout />}  />
         <Route  path="recorder" element={ <RecorderLayout /> } />
      </Route>
    )
  );

  return (
    <RecorderContextProvider>
      <AudioPlayerContextProvider>
      <RouterProvider router={router} />
      </AudioPlayerContextProvider>
    </RecorderContextProvider>
  );
}

export default App;
