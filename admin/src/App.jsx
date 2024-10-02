import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

export default function App() {
  const [admin, setAdmin] = useState(
    localStorage.getItem("admin") ? localStorage.getItem("admin") : ""
  );

  useEffect(() => {
    localStorage.setItem("admin", admin);
  }, [admin]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {admin !== "" ? (
        <>
          <Navbar />
          <div className="flex w-full">
            <Sidebar />
            <div
              className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 
          text-base"
            >
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login setAdmin={setAdmin} />
      )}
    </div>
  );
}
