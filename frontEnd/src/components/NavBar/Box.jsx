import React from 'react';
import { Divider, Drawer, makeStyles, Typography } from '@material-ui/core'
import MenuList from "./MenuList";

const drawerWidth = 240;

const useStyle = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const Box = (props) => {
  const classes = useStyle();
  return (
    <Drawer 
      className={classes.drawer}
      classes={{paper: classes.drawerPaper,}}
      anchor='left'
      variant={props.variant}
      open={props.open}
      onClose={props.onClose ? props.onClose : null}>
        <div className={classes.toolbar}></div>
        <Typography variant="h6" align="center">
            MENU
        </Typography>
        <Divider />
        <MenuList />
    </Drawer>
  );
}

export default Box;