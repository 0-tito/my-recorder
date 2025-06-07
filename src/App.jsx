import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./App.css";


// layouts
import RootLayout from "./components/layouts/RootLayout/RootLayout.jsx";
import About from "./components/aboutPage/about.jsx";
import Home from "./components/homePage/Home.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route index  element={<About />}/>
      <Route path="/home" element={<Home />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
