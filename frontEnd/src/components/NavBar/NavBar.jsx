import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = (props) => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <IconButton color='inherit' aria-label="menu" onClick={() => props.accionAbrir()}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Menu
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;