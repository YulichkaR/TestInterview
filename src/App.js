import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AddEditBook from "./AddEditBook/AddBook";
import Dashboard from "./MainPage/Dashboard/Dashboard";
import "./App.css";
import EditBook from "./MainPage/Dashboard/EditBook";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-book" element={<AddEditBook />} />
        <Route path="/edit-book/:bookid" element={<EditBook />} />
      </Routes>
    </Router>
  );
};

export default App;
