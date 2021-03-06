import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TopBar from "./components/TopBar/TopBar";
import Book from "./components/Book/Book";
import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    top: 40,
    flexGrow: 1,
    justifyContent: "center"
  },
  thumb: {
    width: 100,
    height: 140
  },
  toolbar: {
    position: "fixed",
    top: 56,
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-around",
    zIndex: 2,
    backgroundColor: "white",
    maxWidth: 1200,
    width: "100%",
    padding: 10
  },
  tool: {
    minWidth: 150
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
  const [pub, setPub] = useState("");
  const [size, setSize] = useState("small");

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/newcomics`)
      .then(res => {
        console.log(res);
        // sets all books in state
        setBooks(res.data.comics);
        // sets default display state of all books
        setDisplay(res.data.comics);
        const pubsList = [];
        for (let comic of res.data.comics) {
          if (!pubsList.includes(comic.publisher)) {
            // add publisher to publisher list for filtering
            pubsList.push(comic.publisher);
          }
          // convert release date to nice user-readable format
          comic.release_date = new Date(
            comic.release_date
          ).toLocaleDateString();
        }
        // include default "All" value for pub filtering
        setPublishers(["All"].concat(pubsList.sort()));
        // grab covers array returned from backend
        const { covers } = res.data;
        const covObject = {};
        for (let cover of covers) {
          // associate cover url with Diamond Id of comic book
          covObject[cover.diamond_id] = cover.url;
        }
        setCovers(covObject);
      })
      .catch(err => console.log(err));
  }, []);

  /**
   * Filters books displayed based on publisher.
   * @param {string} publisher
   */
  const pubFilter = publisher => {
    console.log(publisher);
    if (publisher === "All") {
      setDisplay(books);
    } else {
      const filtered = books.filter(book => book.publisher === publisher);
      setDisplay(filtered);
    }
  };

  const sizeHandler = size => {
    setSize(size);
  };

  // handles changing the publisher filter
  const changeHandler = e => {
    setPub(e.target.value);
    pubFilter(e.target.value);
  };

  return (
    <div className="App">
      <TopBar />
      <div className={classes.toolbar}>
        <FormControl className={classes.tool}>
          <InputLabel id="publisher-select-label">Publisher</InputLabel>
          <Select
            labelId="publisher-select-label"
            value={pub}
            onChange={changeHandler}
          >
            {publishers.map(pub => (
              <MenuItem value={pub} key={pub}>
                {pub}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button onClick={() => sizeHandler("small")}>Small</Button>
          <Button onClick={() => sizeHandler("med")}>Medium</Button>
        </ButtonGroup>
      </div>
      <Grid container className={classes.root} spacing={2}>
        {display.map(book => {
          let url = covers[book.diamond_id];
          url = getThumbUrl(url, 2);
          if (url) {
            let thumbnail = getThumbUrl(url, 3);
            return (
              <Grid item key={url}>
                {size === "med" && (
                  <Book url={url} thumbnail={thumbnail} med book={book} />
                )}
                {size === "small" && (
                  <Book url={url} thumbnail={thumbnail} book={book} />
                )}
              </Grid>
            );
          }
        })}
      </Grid>
    </div>
  );
}

export default App;
