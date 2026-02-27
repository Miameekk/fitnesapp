import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home.jsx";

const Layout = ({ showNavbar = false, showFooter = false}) => (
  <div className="app">
    {showNavbar && <Navbar />}
    <main style={{ paddingTop: "70px", minHeight: "calc(100vh - 70px - 80px)" }}>
      <Outlet />
    </main>
    {showFooter && <Footer />}
  </div>
);

export default function App() {
  return(
    <Routes>
      <Route element={<Layout showNavbar={true} showFooter={true} showBackground={true} />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}