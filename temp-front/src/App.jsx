import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import UserPage from "./Pages/UserPage.jsx";
import AppLayout from "./Pages/AppLayout.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
