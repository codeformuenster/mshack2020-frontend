import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import axios from 'axios';
import Dashboard from "./Dashboard";
import { Typography } from "@material-ui/core";


export default function DashboardRouter() {

    const [devices, setDevices] = useState<{ id: string, data: any, lon: number, lat: number }[] | undefined>();

    useEffect(() => {
        async function fetchData() {
            const result_devices = await axios(
                'https://counting-backend.codeformuenster.org/devices',
            );
            setDevices(result_devices.data);
        }
        fetchData()
    }, []);
    console.log(devices)

    return (
        <Router basename="/mshack2020-frontend">
            <Switch>
                <Route path="/" exact>
                    <Dashboard />
                </Route>
                <Route path={"/:id"}>
                    <Typography>hello</Typography>
                </Route>


            </Switch>
        </Router>
    );
}
