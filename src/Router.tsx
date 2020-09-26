import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Device from "./device/Device";


export default function DashboardRouter() {

    return (
        <Router basename="/mshack2020-frontend">
            <Switch>
                <Route path="/" exact>
                    <Dashboard />
                </Route>
                <Route path={"/:id"} component={Device}>
                </Route>
            </Switch>
        </Router>
    );
}
