import React, {useRef, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Password from "../assets/password.png";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import {useAuth} from "../providers/UserContext";
import {useHistory} from "react-router";
import BottomNav from "../menu/BottomNav";

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

function ChangePassword() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updatePassword, updateEmail} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const classes = useStyles();
    return (
        <div>
            <div>
                <Box mb={10}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">
                                Change Password
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Box mt={2}>
                        <Grid container justify="center" alignItems="center">
                            <Avatar alt="Password" src={Password} className={classes.large}/>
                        </Grid>
                    </Box>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form noValidate onSubmit={handleSubmit}>
                        <Typography variant="h4">
                            Enter a new password:
                        </Typography>


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
                            defaultValue={currentUser.email}
                        />

                        <TextField
                            inputRef={passwordRef}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"

                        />

                        <TextField
                            inputRef={passwordConfirmRef}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="confirm-pass"
                            label="Confirm password"
                            name="confirm-pass"
                            autoComplete="confirm-pass"
                            type="password"
                            autoFocus

                        />

                        <Button type="submit"
                                fullWidth variant="contained"
                                color="primary"
                                disabled={loading}>
                            Change Password
                        </Button>

                    </form>
                </Box>
            </div>
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

export default ChangePassword;