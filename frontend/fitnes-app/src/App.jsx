import { Routes, Route, Outlet } from "react-router-dom";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/home.jsx";
import Plan from "./pages/ai/plan.jsx";
import Authors from "./pages/authors/authors.jsx";

const Layout = ({ showFooter = false }) => (
  <div className="app">
    <Navbar />
    <main style={{ paddingTop: "15px", minHeight: "calc(100vh - 70px - 80px)" }}>
      <Outlet />
    </main>
    {showFooter && <Footer />}
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route element={<Layout showFooter={true} />}>
        <Route path="/" element={<Home />} />
        <Route path="/generate-plan" element={<Plan />} />
        <Route path="/autors" element={<Authors />} />
      </Route>
    </Routes>
  );
}