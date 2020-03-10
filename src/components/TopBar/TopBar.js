import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const TopBar = props => {
  const classes = useStyles();
  const [pub, setPub] = useState("All")

  const changeHandler = e => {
    setPub(e.target.value);
    props.filter(e.target.value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Typography variant="h3" className={classes.title}>
          New Comic Book Day!
        </Typography>
        <FormControl>
          <InputLabel id="publisher-select-label">Publisher</InputLabel>
          <Select labelId="publisher-select-label" value={pub} onChange={changeHandler} >
            {props.publishers.map(pub => (
              <MenuItem onClick={e => props.filter(e.target.value)} value={pub}>
                {pub}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </AppBar>
    </div>
  );
};

export default TopBar;
