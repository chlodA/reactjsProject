import React, {useRef, useState} from 'react';
import {useAuth} from "../providers/UserContext";
import {useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {SignUpRoute} from "../Routing";
import {ForgottenPassRoute} from "../Routing";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Logo from '../assets/logo.jpg';
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

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

function SignIn() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }


    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Sign In
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box mt={2}>
                <Grid container justify="center" alignItems="center">
                    <Avatar alt="Logo" src={Logo} className={classes.large} rel="preload"/>
                </Grid>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}
            <form noValidate onSubmit={handleSubmit}>
                <TextField
                    inputRef={emailRef}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus

                />
                <TextField
                    inputRef={passwordRef}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"

                />

                <Button type="submit"
                        fullWidth variant="contained"
                        color="primary"
                        disabled={loading}
                >
                    Sign In
                </Button>
                <Box mt={2}>
                    <Grid container>
                        <Grid item xs>
                            <Link href={ForgottenPassRoute}>
                                {"Forgot password?"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href={SignUpRoute}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </div>
    );
}

export default SignIn;
