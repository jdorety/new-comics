import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import Details from "./Details";

const useStyles = makeStyles(theme => ({
  smallPaper: {
    height: 140,
    width: 100
  },
  medPaper: {
    height: 280,
    width: 200
  },
  smallThumbnail: {
    height: 140,
    width: 100
  },
  medThumbnail: {
    height: 280,
    width: 200
  }
}));

const Book = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Paper className={classes.medPaper} onClick={handleClickOpen}>
        <img
          src={props.thumbnail}
          className={classes.medThumbnail}
          alt="comic book cover"
        />
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClick={handleClose}
      >
        <Details {...props.book} cover={props.url} />
      </Dialog>
    </div>
  );
};

export default Book;
