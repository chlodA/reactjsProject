import React, {useEffect, useRef, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "firebase";
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
    label: {}
}));

function EditOrder(props) {

    const db = firebase.firestore();
    const [street, setStreet] = useState("")
    const [number, setNumber] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [shopname, setShopName] = useState("")
    const [note, setNote] = useState("")
    const [courier, setCourier] = useState("")
    const [trackingnumber, setTrackingNumber] = useState("")
    const history = useHistory();
    const [orderData, setOrderData] = useState(null);

    const fetchSingleDoc = async () => {
        const currentUser = await db
            .collection("orders")
            .doc(props.match.params.id)
            .get()
            .then((snap) => {

                if (snap.exists) {
                    console.log("Document data:", snap.data());
                    console.log("Shopname:", snap.data().shopname, "Note+s:", snap.data().note);
                } else {
                    console.log("Document does not exist!");
                }
            });
    }


    useEffect(() => {

        fetchSingleDoc()

    }, [])

    const Update = (e) => {
        e.preventDefault();

        db.collection("orders").doc(props.match.params.id).update({
            shopname: shopname,
            street: street,
            number: number,
            zip: zip,
            city: city,
            country: country,
            note: note,
            courier: courier,
            trackingnumber: trackingnumber,

            date: Date.now(),
        })
            .then(() => {
                    alert('Successfully updated');
                    history.push("/orders")
                }
            )
    }


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Edit Order
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
                <form onSubmit={Update}>
                    <Box mb={2}>
                        <Box mt={2}>
                            <Grid container justify="center" alignItems="center">
                                <label>Order information: </label>
                            </Grid>
                        </Box>
                        <TextField
                            value={shopname}
                            onChange={(e) => setShopName(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="shopname"
                            label="Shop Name"
                            InputLabelProps={{shrink: true}}
                            name="shopname"
                            autoFocus

                        />
                        <TextField
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            //required
                            fullWidth
                            name="note"
                            label="Note"
                            type="text"
                            id="note"
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            onChange={(e) => setCourier(e.target.value)}
                            value={courier}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="courier"
                            label="Courier"
                            type="text"
                            id="courier"
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            value={trackingnumber}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="tracking"
                            label="Tracking number"
                            type="text"
                            id="tracking"
                            InputLabelProps={{shrink: true}}
                        />
                        <Box mt={2}>
                            <Grid container justify="center" alignItems="center">
                                <label>Delivery address: </label>
                            </Grid>
                        </Box>
                        <TextField
                            onChange={(e) => setStreet(e.target.value)}
                            value={street}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="street"
                            label="Street"
                            type="text"
                            id="street"
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            onChange={(e) => setNumber(e.target.value)}
                            value={number}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="number"
                            label="Number"
                            type="text"
                            id="number"
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            onChange={(e) => setZip(e.target.value)}
                            value={zip}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="zip"
                            label="Zip Code"
                            type="text"
                            id="zip"
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="city"
                            label="City"
                            type="text"
                            id="city"
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            variant="outlined"
                            margin="normal"
                            //required
                            fullWidth
                            name="country"
                            label="Country"
                            type="text"
                            id="country"
                            InputLabelProps={{shrink: true}}
                        />
                    </Box>
                    <Box mb={2}>
                        <Button type="submit"
                                fullWidth variant="contained"
                                color="primary"
                        >
                            Update
                        </Button>
                    </Box>
                </form>
                <Box m={2}>
                    <Button type="submit"
                            fullWidth variant="contained"
                            color="primary"
                            onClick={() => history.goBack()}>
                        Cancel
                    </Button>
                </Box>
            </Container>
        </div>
    );
}

export default EditOrder;

