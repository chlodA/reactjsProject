import React, {useEffect, useState} from "react";
import BottomNav from "./BottomNav";
import TopNav from "./TopNav";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import firebase from "firebase";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import ReactWhatsapp from "react-whatsapp";
import {WhatsappIcon} from "react-share";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router";

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

    font: {
        fontWeight: 'bold',
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    inline: {
        display: 'inline',
    },

    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },

    div: {
        flexGrow: 1,
    },

    btn: {
        border: 'none',
        outline: 'none',
        background: 'none'
    },

    display: {
        display: 'flex',
    },

    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }


}));

function OrderReceived() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const history = useHistory();

    const useItems = () => {
        const [items, setItems] = useState([]);

        useEffect(() => {
            firebase
                .firestore()
                .collection("orders")
                .where('status', '==', 'completed')
                .where("authorID", "==", firebase.auth().currentUser.uid)
                .onSnapshot(snapshot => {
                    const listItems = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setItems(listItems);
                });
        }, []);
        return items;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const removeOrder = async (id) => {
        try {
            firebase.firestore().collection('orders').doc(id).delete().then((handleClose) => {
                console.log('Item removed from database')
                setOpen(false);
            });
        } catch (error) {
            alert(error);
        }
    }


    const listItem = useItems();

    const updateStatusBackward = async (id) => {
        try {
            firebase.firestore().collection('orders').doc(id).update({status: 'pending'}).then((res) => {
                console.log('Item moved to order at address.');
                history.push("/order-at-address")
            })
        } catch (error) {
            alert(error);
        }
    }


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Orders
                    </Typography>
                </Toolbar>
            </AppBar>
            <TopNav/>

            <Box mb={10}>
                {listItem.map(item => (
                    <Box m={2}>
                        <Paper className={classes.paper}>
                            <Grid container
                                  direction="column"
                                  alignItems="center"
                            >
                                <List>
                                    <ListItem key={item.id}
                                    >
                                        <Grid item xs={12} sm container>
                                            <Grid item xs={12} container direction="column">
                                                <Grid item>
                                                    <Typography component={'div'} variant="body2" gutterBottom>
                                                        <ListItemText key={item.shopname} className={classes.font}>Shop
                                                            name: {item.shopname}</ListItemText>

                                                    </Typography>
                                                    <Typography component={'div'} variant="body2" gutterBottom>
                                                        <ListItemText key={item.note}
                                                                      className={classes.font}>Note: {item.note}</ListItemText>
                                                    </Typography>
                                                    <Typography component={'div'} variant="body2" gutterBottom>
                                                        <ListItemText key={item.courier}
                                                                      className={classes.font}>Courier: {item.courier}</ListItemText>
                                                    </Typography>
                                                    <Typography component={'div'} variant="body2" gutterBottom>
                                                        <ListItemText key={item.trackingnumber}
                                                                      className={classes.font}>Tracking
                                                            Number: {item.trackingnumber}</ListItemText>
                                                    </Typography>
                                                    <Typography component={'div'} variant="body2" gutterBottom>
                                                        <ListItemText key={item.number}
                                                                      className={classes.font}>Address:</ListItemText>
                                                    </Typography>
                                                    <Typography component={'div'} variant="body2" color="textSecondary">
                                                        <ListItemText
                                                            key={item.street}>{item.street} {item.number}</ListItemText>
                                                        <ListItemText
                                                            key={item.city}>{item.zip} {item.city}</ListItemText>
                                                        <ListItemText key={item.country}>{item.country}</ListItemText>
                                                    </Typography>
                                                </Grid>
                                            </Grid>


                                            <Grid item className={classes.display}>
                                                <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <Dialog
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">{'Delete Order'}</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Are you sure?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose} color="primary">
                                                            No
                                                        </Button>
                                                        <Button onClick={() => removeOrder(item.id)} color="primary">
                                                            Yes
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>

                                                <IconButton edge="end"
                                                            aria-label="edit"
                                                >
                                                    <Link to={"/edit-order/" + item.id}>
                                                        <EditIcon/>
                                                    </Link>
                                                </IconButton>


                                                <ReactWhatsapp number="" message=""
                                                               className={classes.btn}>
                                                    <WhatsappIcon size={30}
                                                                  round={true}/>
                                                </ReactWhatsapp>

                                                <IconButton edge="end" aria-label="backward"
                                                            onClick={() => updateStatusBackward(item.id)}>
                                                    <ArrowBackIcon/>
                                                </IconButton>

                                            </Grid>
                                        </Grid>

                                    </ListItem>
                                </List>

                            </Grid>
                        </Paper>
                    </Box>
                ))}
            </Box>

            <Box

                width="100%"
                position="fixed"
                bottom="0"
            >
                <BottomNav/>
            </Box>

        </div>
    )

}

export default OrderReceived