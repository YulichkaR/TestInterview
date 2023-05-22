import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../common/Footer";
const AddEditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setISBN] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !author || !category || !isbn) {
      setErrorMessage("All fields are required");
      return;
    }
    const now = new Date();
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const createdAt = now.toLocaleString("en-US", options);
    const book = {
      title,
      author,
      category,
      isbn,
      createdAt,
    };
    console.log(book);
    fetch("http://localhost:3000/books/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    setTitle("");
    setAuthor("");
    setCategory("");
    setISBN("");
    setErrorMessage("");

    alert("Book successfully added/updated.");
  };

  return (
    <div className="add-edit-page">
      <h1 className="add-edit-page__title">Add a Book</h1>
      <div className="data__block">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label-name">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="label-name">Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <label className="label-name">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="label-name">ISBN:</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setISBN(e.target.value)}
            />
          </div>

          {errorMessage && <p>{errorMessage}</p>}
          <div className="add-a-book__button-block">
            <button className="add-a-book__button" type="submit">
              Add a Book
            </button>
          </div>
        </form>
      </div>
      <div>
        <button className="add-book__button add-edit__button">
          <Link to="/dashboard">Back to Dashboard</Link>
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default AddEditBook;
