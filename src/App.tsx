import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import Layout from "./layout";
import HomePage from "./pages/Home";

export default function App() {
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </>
  );
}
