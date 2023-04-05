import React, {useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Settings from "../assets/settings.png";
import Box from "@material-ui/core/Box";
import BottomNav from "./BottomNav";
import Link from "@material-ui/core/Link";
import {ChangeEmailRoute, ChangePhotoRoute} from "../Routing";
import {ChangePasswordRoute} from "../Routing";


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
    links: {
        color: 'white',
        underline: "none",
    }

}));

function SettingsScreen() {


    const classes = useStyles();
    return (

        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Settings
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.paper}>
                <Box mt={2}>
                    <Avatar alt="Logo" src={Settings} className={classes.large}/>
                </Box>

                <Box mt={2}>
                    <Grid container justify="center" alignItems="center">
                        <Button type="submit"
                                variant="contained"
                                color="primary"
                        >
                            <Link className={classes.links}
                                  href={ChangePasswordRoute}>
                                Change password
                            </Link>
                        </Button>
                    </Grid>
                </Box>
                <Grid container justify="center" alignItems="center">
                    <Box mt={2}>

                        <Button type="submit"
                                variant="contained"

                                color="primary"><Link className={classes.links}
                                                      href={ChangeEmailRoute}>
                            Change E-Mail
                        </Link>
                        </Button>

                    </Box>
                </Grid>
                <Grid container justify="center" alignItems="center">
                    <Box mt={2}>

                        <Button type="submit"
                                variant="contained"

                                color="primary"><Link className={classes.links}
                                                      href={ChangePhotoRoute}>
                            Choose Photo
                        </Link>
                        </Button>

                    </Box>
                </Grid>

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

export default SettingsScreen;

