import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import { PreloaderProvider, usePreloader } from "./context/PreloaderContext";
import Layout from "./layout";
import HomePage from "./pages/Home";

function AppContent() {
  const { setLoaded } = usePreloader();

  return (
    <>
      <Preloader onComplete={setLoaded} />
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

export default function App() {
  return (
    <PreloaderProvider>
      <AppContent />
    </PreloaderProvider>
  );
}
