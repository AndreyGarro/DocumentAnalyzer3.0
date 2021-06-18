import React, { Fragment, useState } from 'react';
import { makeStyles, TextField, Button, AppBar, Typography, Toolbar, Dialog, DialogActions, 
    DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50%',
      },
    },
    offset: theme.mixins.toolbar
}));

const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [login, setLogin] = useState({
        user: '',
        password: ''
    });

    const handleInputChange = (event) => {
        setLogin({...login, [event.target.name] : event.target.value})
    } 
        
    const handleClose = () => {
        setOpen(false);
    };

    async function send (event) {
        event.preventDefault();
        let test = await fetch('http://localhost:4000/Login', {
                method: 'GET',
                headers : {
                Accept: '*/*',
                'Content-Type': 'text/plain',
                user: login.user,
                password: login.password
                }});
        const json = await test.json();
        if (json.status == "ok"){
            localStorage.setItem('account', login.user);
            //let a = localStorage.getItem("account")?.toLowerCase();
            //console.log(a)
            {/*console.log(login.user + " " + login.password);*/}
            let path = '/Upload'; 
            history.push(path);
        }
        else{
            setOpen(true);
        }
    }
    return ( 
        <Fragment>
            <AppBar position="fixed" color="primary"> 
                <Toolbar>
                <Typography variant="h6">
                    LOGIN
                </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}/>
            <Typography variant="h3" align='center'>
                    Welcome
            </Typography>
            <form className={classes.root} autoComplete="off" align="center" onSubmit={send}>
                <AccountCircleRoundedIcon color="disabled" style={{ fontSize: 100 }}/>
                <TextField id="user" label="User" color="primary" name="user" onChange={handleInputChange}/>
                <p></p>
                <TextField type="password" id="password" label="Password" color="primary" name="password" onChange={handleInputChange}/>
                <p></p>
                <Button variant="contained" color="primary" type="submit">
                Accept
                </Button>
            </form>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Login Failed"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your ID or password is incorrect. Please try again.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
     );
}
 
export default Login;