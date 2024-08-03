import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import ProductSetting from "./pages/ProductSetting";
import Navbar from "./components/Navbar"; // Pastikan Anda memiliki komponen Navbar

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-view" element={<ProductView />} />
            <Route path="/product-setting" element={<ProductSetting />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
