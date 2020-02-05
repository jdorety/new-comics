import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles(theme => ({
  paper: {
    height: 140,
    width: 100
  },
  thumbnail: {
    width: 100,
    height: 140
  }
}));

const Book = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Paper
        aria-describedby={id}
        className={classes.paper}
        onClick={handleClick}
      >
        <img
          src={props.url}
          className={classes.thumbnail}
          alt="comic book cover"
        />
      </Paper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
      ></Popover>
    </div>
  );
};

export default Book;
