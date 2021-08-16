import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isauthenticated } from '../backend/Auth';

function AdminRoute({ component: Component, ...rest }) {

    return (<Route {...rest} render={(props) =>
        (isauthenticated() && isauthenticated().user.role === "admin") ? (<Component {...props} />) : (
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    } />)
}

export default AdminRoute;