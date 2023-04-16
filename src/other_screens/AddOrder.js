import React, {useEffect, useRef, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "firebase";
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
    label: {


        justifyContent: "center",
        font: "initial",
    }
}));

function AddOrder() {

    const [addressName, setAddressName] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [ordered, setOrdered] = useState('')
    const [shopname, setShopName] = useState('')
    const [note, setNote] = useState('')
    const [courier, setCourier] = useState('')
    const [trackingnumber, setTrackingNumber] = useState('')
    const [orders, setOrders] = useState([]);
    const currentUser = firebase.auth().currentUser.uid;

    const current = 'ordered'

    const classes = useStyles();

    const entityRef = firebase.firestore().collection("orders")


    useEffect(() => {
        entityRef
            .onSnapshot(
                querySnapshot => {
                    const newOrder = []
                    querySnapshot.forEach(doc => {
                        const order = doc.data()
                        order.id = doc.id
                        newOrder.push(order)
                    });
                    setOrders(newOrder)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = e => {

        e.preventDefault()

        if (shopname === '') {
            alert('Add shop name for this order')
        } else {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                street: street,
                number: number,
                zip: zip,
                city: city,
                country: country,
                authorID: currentUser,
                // createdAt,
                status: current,
                createdAt: timestamp,
                ordered: ordered,
                shopname: shopname,
                note: note,
                courier: courier,
                trackingnumber: trackingnumber,

            };
            alert('Order was added')
            entityRef
                .add(data)
                .then(_doc => {
                    setAddressName('')
                    setStreet('')
                    setNumber('')
                    setZip('')
                    setCity('')
                    setCountry('')
                    setOrdered('')
                    setShopName('')
                    setNote('')
                    setCourier('')
                    setTrackingNumber('')
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    return (

        <div>
            <div>
                <Box mb={10}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">
                                Add Order
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <form noValidate onSubmit={onAddButtonPress}>
                        <Box mt={2}>
                            <Grid container justify="center" alignItems="center">
                                <label>Order information: </label>
                            </Grid>
                        </Box>
                        <TextField
                            value={shopname}
                            onChange={e => setShopName(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="shopname"
                            label="Shop Name"
                            name="shopname"
                            autoComplete="shopname"
                            autoFocus
                        />
                        <TextField
                            onChange={e => setNote(e.target.value)}
                            value={note}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="note"
                            label="Note"
                            type="note"
                            id="note"
                        />
                        <TextField
                            onChange={e => setCourier(e.target.value)}
                            value={courier}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="courier"
                            label="Courier"
                            type="courier"
                            id="courier"
                        />
                        <TextField
                            onChange={e => setTrackingNumber(e.target.value)}
                            value={trackingnumber}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="tracking"
                            label="Tracking number"
                            type="tracking"
                            id="tracking"
                        />
                        <Grid container justify="center" alignItems="center">
                            <label>Delivery address: </label>
                        </Grid>
                        <TextField
                            onChange={e => setStreet(e.target.value)}
                            value={street}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="street"
                            label="Street"
                            type="street"
                            id="street"
                        />
                        <TextField
                            onChange={e => setNumber(e.target.value)}
                            value={number}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="number"
                            label="Number"
                            type="number"
                            id="number"
                        />
                        <TextField
                            onChange={e => setZip(e.target.value)}
                            value={zip}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="zip"
                            label="Zip Code"
                            type="zip"
                            id="zip"
                        />
                        <TextField
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="city"
                            label="City"
                            type="city"
                            id="city"
                        />
                        <TextField
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="country"
                            label="Country"
                            type="country"
                            id="country"
                        />

                        <Button type="submit"
                                fullWidth variant="contained"
                                color="primary"
                        >
                            Add
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

export default AddOrder;
