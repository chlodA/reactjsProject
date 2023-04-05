import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Link, useHistory} from "react-router-dom";


const useStyles = makeStyles({
    root: {
        justify: "center",
        width: '100%',
        color: 'white',
        background: "#3f50b5",
        marginTop: 10,
    },
    links: {
        color: "white",
        underline: "none",
    }
});

function BottomNav() {

    const routes = ["/", "/orders", "/settings"];

    const classes = useStyles();

    const pathname = window.location.pathname

    const [value, setValue] = React.useState(0);
    const history = useHistory();
    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.info("clicked.");
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={classes.root}
        >

            <BottomNavigationAction label="Home"
                                    value={routes[0]}
                                    component={Link}
                                    to={routes[0]}
                                    className={classes.links}/>
            <BottomNavigationAction label="Orders"
                                    value={routes[1]}
                                    component={Link}
                                    to={routes[1]}
                                    className={classes.links}/>
            <BottomNavigationAction label="Settings"
                                    value={routes[2]}
                                    component={Link}
                                    to={routes[2]}
                                    className={classes.links}/>
        </BottomNavigation>
    );

}

export default BottomNav;