import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Link} from "react-router-dom";


const useStyles = makeStyles({
    root: {
        justify: "center",
        width: '100%',
        color: 'white',
        background: "#ffffff",
        bottom: 0,
    },
    links: {
        color: "#3f50b5",
        underline: "none",
    }
});

function TopNav() {

    const routes = ["/orders", "/order-at-address", "/order-received"];

    const classes = useStyles();

    const pathname = window.location.pathname

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => handleChange(event, newValue)}
            showLabels
            className={classes.root}
        >

            <BottomNavigationAction label="New Orders"
                                    value={routes[0]}
                                    component={Link}
                                    to={routes[0]}
                                    className={classes.links}/>
            <BottomNavigationAction label="Package arived at address"
                                    value={routes[1]}
                                    component={Link}
                                    to={routes[1]}
                                    className={classes.links}/>
            <BottomNavigationAction label="Received"
                                    value={routes[2]}
                                    component={Link}
                                    to={routes[2]}
                                    className={classes.links}/>
        </BottomNavigation>
    );

}

export default TopNav;