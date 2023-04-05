import React, {useRef, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Email from "../assets/email.png";
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
    const repeatEmailRef = useRef()
    const {currentUser, updatePassword, updateEmail} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        if (emailRef.current.value !== repeatEmailRef.current.value) {
            return setError("Emails do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
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
                                Change Email
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box mt={2}>
                        <Grid container justify="center" alignItems="center">
                            <Avatar alt="Email" src={Email} className={classes.large}/>

                        </Grid>
                        <strong>Email:</strong> {currentUser.email}
                    </Box>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form noValidate onSubmit={handleSubmit}>
                        <Typography variant="h4">
                            Enter your new e-mail
                        </Typography>

                        <TextField
                            inputRef={emailRef}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="New Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />

                        <TextField
                            inputRef={repeatEmailRef}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email-repeat"
                            label="Repeat the Email Address"
                            name="email-repeat"
                            autoComplete="email-repeat"
                            autoFocus
                        />


                        <Button type="submit"
                                fullWidth variant="contained"
                                color="primary"
                                disabled={loading}>
                            Change Email
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