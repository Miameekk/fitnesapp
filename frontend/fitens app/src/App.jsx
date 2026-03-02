import { Routes, Route, Outlet } from "react-router-dom";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home.jsx";

const Layout = ({  showFooter = false}) => (
  <div className="app">
    <main style={{ paddingTop: "15px", minHeight: "calc(100vh - 70px - 80px)" }}>
      <Outlet />
    </main>
    {showFooter && <Footer />}
  </div>
);

export default function App() {
  return(
    <Routes>
      <Route element={<Layout showFooter={true} />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}