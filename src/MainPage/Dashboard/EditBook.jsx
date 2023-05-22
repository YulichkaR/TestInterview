import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../../common/Footer";

const EditBook = () => {
  const { bookid } = useParams();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books`);
      const data = await response.json();
      const book = data.find((elem) => {
        return elem.id == bookid;
      });
      setBookData(book);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, author, category, isbn, createdAt } = bookData;

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
    const modifiedAt = now.toLocaleString("en-US", options);

    const updatedBook = {
      id: bookid,
      createdAt,
      modifiedAt,
      title,
      author,
      category,
      isbn,
    };

    fetch(`http://localhost:3000/books/${bookid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    setErrorMessage("");
    alert("Book successfully updated.");
  };

  const { title, author, category, isbn } = bookData;

  return (
    <div className="add-edit-page">
      <h1 className="add-edit-page__title">Edit a Book</h1>
      <div className="data__block">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label-name">Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label-name">Author:</label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label-name">Category:</label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label-name">ISBN:</label>
            <input
              type="text"
              name="isbn"
              value={isbn}
              onChange={handleInputChange}
            />
          </div>

          {errorMessage && <p>{errorMessage}</p>}
          <div className="add-a-book__button-block">
            <button className="add-a-book__button" type="submit">
              Update Book
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

export default EditBook;
