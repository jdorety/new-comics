import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TopBar from "./components/TopBar/TopBar";
import Book from "./components/Book/Book";
import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: "center"
  },
  thumb: {
    width: 100,
    height: 140
  }
}));

const getThumbUrl = (url, digit) => {
  if (!url) return false;
  let lastIndex = url.length - 1;
  let thumb = url.slice(0, lastIndex);
  return thumb + digit.toString();
};

function App() {
  const [books, setBooks] = useState([]);
  const [display, setDisplay] = useState([]);
  const [covers, setCovers] = useState({});
  const [publishers, setPublishers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/newcomics`)
      .then(res => {
        console.log(res);
        setBooks(res.data.comics);
        setDisplay(res.data.comics);
        const pubsList = ["All"];
        for (let comic of res.data.comics) {
          if (!pubsList.includes(comic.publisher)) {
            pubsList.push(comic.publisher);
          }
        }
        setPublishers(pubsList);
        const { covers } = res.data;
        const covObject = {};
        for (let cover of covers) {
          covObject[cover.diamond_id] = cover.url;
        }
        setCovers(covObject);
      })
      .catch(err => console.log(err));
  }, []);

  const pubFilter = publisher => {
    console.log(publisher);
    if (publisher === "All") {
      setDisplay(books);
    } else {
      const filtered = books.filter(book => book.publisher === publisher);
      setDisplay(filtered);
    }
  };

  return (
    <div className="App">
      <TopBar publishers={publishers} filter={pubFilter} />
      {/* {books.map(book => {
        if (covers[book.diamond_id]) {
          let url = covers[book.diamond_id];
          let lastIndex = url.length - 1;
          let thumb = url.slice(0, lastIndex);
          let thumbnail = thumb + "3";
          return <InfoBox {...book} cover_url={thumbnail} key={book.diamond_id} />;
        } else {
          return <InfoBox {...book} key={book.diamond_id} />;
        }
      })} */}
      <Grid container className={classes.root} spacing={2}>
        {display.map(book => {
          let url = covers[book.diamond_id];
          url = getThumbUrl(url, 2);
          if (url) {
            let thumbnail = getThumbUrl(url, 3);
            return (
              <Grid item key={url}>
                <Book url={url} thumbnail={thumbnail} book={book} />
              </Grid>
            );
          }
        })}
      </Grid>
    </div>
  );
}

export default App;
