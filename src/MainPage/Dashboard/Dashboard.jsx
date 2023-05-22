import React, { useState, useEffect } from "react";
import { Footer } from "../../common/Footer";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("active");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const filteredBooks = books.filter((book) => {
    if (filter === "active") {
      return book.isActive;
    } else if (filter === "deactivated") {
      return !book.isActive;
    } else {
      return true;
    }
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleDelete = (bookId) => {
    fetch(`http://localhost:3000/books/${bookId}`, {
      method: "DELETE",
    });
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
  };

  const handleDeactivate = (bookId) => {
    const bookToDeactivate = books.find((book) => book.id === bookId);
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        book.isActive = !book.isActive;
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  return (
    <div>
      <h1 className="main-page__title">Dashboard</h1>

      <div className="panel">
        <select value={filter} onChange={handleFilterChange} className="filter">
          <option value="all">Show All</option>
          <option value="active">Show Active</option>
          <option value="deactivated">Show Deactivated</option>
        </select>
        <p>
          Showing {filteredBooks.length} of {books.length} records
        </p>
        <Link to="/add-book">
          <button className="add-book__button">
            <a href="">Add a Book</a>
          </button>
        </Link>
      </div>

      <table id="dashboard">
        <thead>
          <tr>
            <th>Book title</th>
            <th>Author name</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Created At</th>
            <th>Modified/Edited At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.isbn}</td>
              <td>{book.createdAt}</td>
              <td>{book.modifiedAt}</td>
              <td className="functional-buttons">
                <button onClick={() => handleEdit(book.id)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
                <button onClick={() => handleDeactivate(book.id)}>
                  {book.isActive ? "Deactivate" : "Re-Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

const Filter = () => {
  return (
    <select className="filter">
      <option value="all">Show All</option>
      <option value="active">Show Active</option>
      <option value="deactivated">Show Deactivated</option>
    </select>
  );
};

export default Dashboard;
