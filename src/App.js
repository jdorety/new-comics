import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoBox from "./components/InfoBox";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [covers, setCovers] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/newcomics`)
      .then(res => {
        console.log(res);
        setBooks(res.data.comics);
        const { covers } = res.data;
        const covObject = {};
        for (let cover of covers) {
          covObject[cover.diamond_id] = cover.url;
        }
        setCovers(covObject);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      {books.map(book => {
        if (covers[book.diamond_id]) {
          let url = covers[book.diamond_id];
          let lastIndex = url.length - 1;
          let thumb = url.slice(0, lastIndex);
          let thumbnail = thumb + "3";
          return <InfoBox {...book} cover_url={thumbnail} key={book.diamond_id} />;
        } else {
          return <InfoBox {...book} key={book.diamond_id} />;
        }
      })}
    </div>
  );
}

export default App;
