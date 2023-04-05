import React, {useRef, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Logo from "../assets/logo.jpg";
import Box from "@material-ui/core/Box";
import {useAuth} from "../providers/UserContext";
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

function ForgottenPassword() {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }


    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Forgotten Password
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box mt={2}>
                    <Grid container justify="center" alignItems="center">
                        <Avatar alt="Logo" src={Logo} className={classes.large}/>
                    </Grid>
                </Box>
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <form noValidate onSubmit={handleSubmit}>
                    <Typography variant="h4">
                        Forgot your password?
                    </Typography>
                    <Typography variant="h6">
                        Enter your email to find account:
                    </Typography>
                    {/*{emailHasBeenSent && (*/}
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

                    <Button type="submit"
                            fullWidth variant="contained"
                            color="primary">
                        Reset Password
                    </Button>

                </form>
            </div>
        </Container>
    );
}

export default ForgottenPassword;

