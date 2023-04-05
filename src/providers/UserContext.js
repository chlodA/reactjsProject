import React, {useContext, useState, useEffect} from "react"
import {auth} from "../firebase"
import firebase from "firebase";

const UserContext = React.createContext()

export function useAuth() {
    return useContext(UserContext)
}

export function UserProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState();
    const types = ['image/png', "image/jpg", "image/jpeg"];
    const [er, setEr] = useState(null);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                const uid = res.user.uid
                const name = res.user.displayName
                const data = {
                    id: uid,
                    email,
                    name: name,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        console.log('UID:', uid);
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })

            .catch((error) => {
                alert(error)
            });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    )
}