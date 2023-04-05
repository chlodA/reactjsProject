import React, {useContext, useState, useEffect} from "react"
import firebase from "firebase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BottomNav from "../menu/BottomNav";

function Photo() {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState();
    const types = ['image/png', "image/jpg", "image/jpeg"];
    const [er, setEr] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    let selected = {};

    function handleChange(e) {
        selected = e.target.files[0];
        if (e.target.files[0] && types.includes(selected.type)) {
            setImage(e.target.files[0]);
            setEr('');
            console.log("picture choosen")

        } else {
            setImage(null);
            setEr('Select an img or png file');
        }

    }

    const addPic = () => {
        /*  firebase.auth().onAuthStateChanged(user => {
              if (user) {*/
        const uploadTask = firebase.storage().ref('users/' + firebase.auth().currentUser.uid + '/profilePic').put(image);
        uploadTask.on(
            "state_changed",

            () => {
                firebase.storage()
                    .ref('users/')
                    .child(firebase.auth().currentUser.uid + '/profilePic')
                    .getDownloadURL()
                    .then(imageUrl => {
                        setImageUrl(imageUrl);
                        console.log('successfully uploaded')
                        alert('Succesfully updated photo')
                    });
            })
    }

    console.log("image: ", image);
    console.log("image url: ", imageUrl);


    return (

        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Add Picture
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box mt={2}>
                <Grid container justify="center" alignItems="center">
                    <Box mt={2}>
                        <div>Add a profile picture</div>
                        <input
                            type='file'
                            required
                            onChange={handleChange}
                        >
                        </input>
                        <div>
                            {er && <div>{er}</div>}
                        </div>
                        <div>
                            {image && <div>{'profilePic'}</div>}
                        </div>
                    </Box>
                </Grid>

                <Grid container justify="center" alignItems="center">
                    <Box mt={2}>
                        <img src={imageUrl || "http://via.placeholder.com/100"}
                             alt="profile-image"
                             height="100px"
                             width="100px"/>
                    </Box>
                </Grid>

            </Box>

            <Button type="submit"
                    fullWidth variant="contained"
                    color="primary"
                    onClick={addPic}
            >
                Add Picture
            </Button>
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

export default Photo;