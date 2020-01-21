import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoBox from "./components/InfoBox";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/newcomics`)
      .then(res => {
        console.log(res);
        setBooks(res.data.comics);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      {books.map(book => {
        return <InfoBox {...book} key={book.diamond_id} />;
      })}
    </div>
  );
}

export default App;
