import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: "center"
  },
  paper: {
    width: 100,
    height: 140
    // height: 140,
    // width: 100
  },
  thumb: {
    width: 100,
    height: 140
  }
}));

const getThumbUrl = url => {
  let lastIndex = url.length - 1;
  let thumb = url.slice(0, lastIndex);
  return thumb + "3";
};

function App() {
  const [books, setBooks] = useState([]);
  const [covers, setCovers] = useState({});
  const classes = useStyles();

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
        {books.map(book => {
          let url = covers[book.diamond_id];
          if (url) {
            url = getThumbUrl(url);
            return (
              <Grid item xsUp={12} key={url}>
                <Paper url={url} className={classes.paper}>
                  <img
                    className={classes.thumb}
                    src={url}
                    alt="comic book cover"
                  />
                </Paper>
              </Grid>
            );
          }
        })}
      </Grid>
    </div>
  );
}

export default App;
