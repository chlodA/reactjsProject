import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import BottomNav from "./BottomNav";
import {AddOrderRoute} from "../Routing";
import Link from "@material-ui/core/Link";
import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import Alert from "@material-ui/lab/Alert";
import {useAuth} from "../providers/UserContext";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        color: 'white',
        underline: "none",
    },
}));

function HomeScreen() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()
    const classes = useStyles();
    const [url, setUrl] = useState("");

    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/signin")
        } catch {
            setError("Failed to log out")
        }
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.storage().ref('users/' + firebase.auth().currentUser.uid)
                .child('/profilePic')
                .getDownloadURL()
                .then(url => {
                    //image.src = url
                    console.log(url);
                    setUrl(url)
                })
        }
    })

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Home
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.paper}>
                <Box mt={2}>
                    <Grid container justify="center" alignItems="center">
                        <Box mt={2}>
                            <img src={url || "http://via.placeholder.com/100"}
                                 alt="profile-image"
                                 height="100px"
                                 width="100px"/>
                        </Box>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <strong>Email: </strong> {currentUser.email}
                    </Grid>
                </Box>
            </div>
            <Container component="main" maxWidth="xs">
                {error && <Alert severity="error">{error}</Alert>}
                <form noValidate>
                    <Box mt={2}>
                        <Grid container justify="center" alignItems="center">
                            <Typography variant="h6">
                                Now you can add your orders and be sure not to forget about them!
                            </Typography>
                        </Grid>
                    </Box>
                    <Box mt={2}>
                        <Grid container justify="center" alignItems="center">
                            <Button type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLogout}>
                                Logout
                            </Button>
                        </Grid>
                    </Box>
                    <Grid container justify="center" alignItems="center">
                        <Box mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                <Link className={classes.button} href={AddOrderRoute}>
                                    Add a new Order</Link>
                            </Button>
                        </Box>
                    </Grid>
                </form>
            </Container>
            <Box
                width="100%"
                position="fixed"
                bottom="0"
            >
                <BottomNav/>
            </Box>
        </div>
    );
}

export default HomeScreen;

