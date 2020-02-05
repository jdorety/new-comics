import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  cover: {
    width: "100%"
  }
}));

const Details = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.publisher}</DialogContent>
      <img className={classes.cover} src={props.cover} alt="big comic cover" />
      <DialogContent>
        <DialogContentText>{props.creators}</DialogContentText>
      </DialogContent>
      <DialogContent>{props.price}</DialogContent>
      <DialogContent>Release Date: {props.release_date}</DialogContent>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
      </DialogContent>
    </div>
  );
};

export default Details;
