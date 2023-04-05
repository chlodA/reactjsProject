import React, {useRef, useState} from 'react';
import {useAuth} from "../providers/UserContext";
import {Link, useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Logo from "../assets/logo.jpg";
import Alert from '@material-ui/lab/Alert';

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
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

function SignUp() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const {handleChange} = useAuth()
    const [er, setEr] = useState(null);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const classes = useStyles();

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match")
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            alert('You successfully registered a new account. Please log in.')
            history.push("/signin")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Sign Up
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box mt={2}>
                <Grid container justify="center" alignItems="center">
                    <Avatar alt="Logo" src={Logo} className={classes.large}/>
                </Grid>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    inputRef={nameRef}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nick Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                />
                <TextField
                    inputRef={emailRef}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    autoComplete="email"
                />
                <TextField
                    inputRef={passwordRef}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    autoFocus
                />
                <TextField
                    inputRef={passwordConfirmRef}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    autoFocus
                />
                <Button type="submit"
                        fullWidth variant="contained"
                        color="primary"
                        disabled={loading}
                >
                    Register
                </Button>
            </form>
            <div>
                Already have an account? <Link to="/"> Log in. </Link>
            </div>
        </div>
    );
}

export default SignUp;

