import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Reservations from "./components/pages/Reservations";
import Contact from "./components/pages/Contact";
import Menu from "./components/pages/Menu";
import NotFound from "./components/pages/NotFound";
import Admin from "./components/pages/Login";
import Register from "./components/pages/Register";
import AdminId from "./components/pages/AdminId";
import Login from "./components/pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/start" element={<AdminId />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
