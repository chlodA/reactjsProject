import React, {useState, lazy, Suspense} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {UserProvider} from "./providers/UserContext";

const SignIn = React.lazy(() => import("./authorization/SignIn" /* webpackChunkName: "signin"*/));
const SignUp = React.lazy(() => import("./authorization/SignUp" /* webpackChunkName: "signup"*/));
const ForgottenPassword = React.lazy(() => import("./authorization/ForgottenPassword" /* webpackChunkName: "forgottenpass"*/));
const HomeScreen = React.lazy(() => import("./menu/HomeScreen" /* webpackChunkName: "home"*/));
const SettingsScreen = React.lazy(() => import("./menu/SettingsScreen"/* webpackChunkName: "settings" */));
const Orders = React.lazy(() => import( "./menu/Orders" /* webpackChunkName: "orders"*/));
const AddOrder = React.lazy(() => import("./other_screens/AddOrder" /* webpackChunkName: "add"*/));
const EditOrder = React.lazy(() => import("./other_screens/EditOrder" /* webpackChunkName: "edit"*/));
const NotFound = React.lazy(() => import("./NotFound" /* webpackChunkName: "notfound"*/));
const Fallback = React.lazy(() => import("../src/fallback" /* webpackChunkName: "fallback"*/));

const PrivateRoute = React.lazy(() => import( "./authorization/PrivateRoute" /* webpackChunkName: "private"*/));
const ChangeEmail = React.lazy(() => import( "./authorization/ChangeEmail" /* webpackChunkName: "changeemail"*/));
const ChangePassword = React.lazy(() => import("./authorization/ChangePassword" /* webpackChunkName: "changepassword"*/));
const Photo = React.lazy(() => import("./authorization/Photo" /* webpackChunkName: "photo"*/));
const OrderReceived = React.lazy(() => import("./menu/OrderReceived" /* webpackChunkName: "received"*/));
const OrdersAtAddress = React.lazy(() => import("./menu/OrderAtAddress" /* webpackChunkName: "ataddress"*/));
export const SignInRoute = "/signin";
export const SignUpRoute = "/signup";
export const ForgottenPassRoute = "/forgotten";
export const HomeScreenRoute = "/";
export const SettingsScreenRoute = "/settings";
export const OrdersRoute = "/orders";
export const AddOrderRoute = "/addorder";
export const ChangeEmailRoute = "/change-email";
export const ChangePasswordRoute = "/change-password";
export const OrderReceivedRoute = "/order-received";
export const OrderAtAddressRoute = "/order-at-address";
export const ChangePhotoRoute = "/change-photo";
export const FallbackRoute = "/fallback";

function Routing() {
    return (
        <Router>
            <React.Suspense fallback={<div>Loading</div>}>
                <UserProvider>
                    <Switch>
                        <Route path={SignInRoute} component={SignIn}/>
                        <Route path={SignUpRoute} component={SignUp}/>
                        <Route path={ForgottenPassRoute} component={ForgottenPassword}/>
                        <Route path="/edit-order/:id" component={EditOrder}/>
                        <PrivateRoute path={HomeScreenRoute} exact component={HomeScreen}/>
                        <PrivateRoute path={SettingsScreenRoute} component={SettingsScreen}/>
                        <PrivateRoute path={OrdersRoute} component={Orders}/>
                        <PrivateRoute path={AddOrderRoute} component={AddOrder}/>
                        <PrivateRoute path={ChangePasswordRoute} component={ChangePassword}/>
                        <PrivateRoute path={ChangeEmailRoute} component={ChangeEmail}/>
                        <PrivateRoute path={ChangePhotoRoute} component={Photo}/>
                        <PrivateRoute path={OrderAtAddressRoute} component={OrdersAtAddress}/>
                        <PrivateRoute path={OrderReceivedRoute} component={OrderReceived}/>
                        <Route component={NotFound}/>
                    </Switch>
                </UserProvider>
            </React.Suspense>
        </Router>
    );
}

export default Routing