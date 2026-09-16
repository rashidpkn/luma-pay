import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import HomePage from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
