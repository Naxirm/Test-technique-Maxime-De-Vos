/* fichier contenant mes routes et mon alerte toastify */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExcusePage from "./pages/ExcusePage";
import Lost from "./pages/Lost";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ExcusePage />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
