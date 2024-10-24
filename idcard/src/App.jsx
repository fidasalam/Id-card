// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyle";
import CustomizableCanvas from "./components/CustomizableCanvas";
import IDCardTemplate from "./components/IdcardTemplate";
import AddStudent from "./components/StudentCardPreview";
import StudentList from "./components/StudentList";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<CustomizableCanvas />} />
          <Route path="id-card" element={<IDCardTemplate />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/student" element={<StudentList />} />
        </Routes>
      </Router>
      {/* <Footer /> */}
    </>
  );
};

export default App;
