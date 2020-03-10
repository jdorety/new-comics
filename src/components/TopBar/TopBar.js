import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Toolbar from "@material-ui/core/Toolbar";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
  }
}));

const TopBar = props => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            New Comics!
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;
