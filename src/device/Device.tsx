import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import { Paper } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://codeformuenster.org/">
        Münster Zählt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: "70vh",
  },
}));

export default function Device(props: any) {
  const classes = useStyles();
  const id = props.match.params.id
  const [counts, setCounts] = useState<{ counts:{device_id: string, id: string, data: any, timestamp: string, count: number}[] } | undefined>();
  // const [devices, setDevices] = useState<{ id: string, data: any, lon: number, lat: number }[] | undefined>();
  useEffect(() => {
    async function fetchData() {
      const result_counts = await axios(
        'https://counting-backend.codeformuenster.org/counts/' + id,
      );
      setCounts(result_counts.data);
    }
    fetchData()
  }, [id]);

  console.log(counts)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {counts && counts.counts &&
          <Paper className={fixedHeightPaper}>
            <Title>{id}</Title>
            <ResponsiveContainer>
              <LineChart
                data={counts.counts}
                margin={{
                  top: 16,
                  right: 16,
                  bottom: 0,
                  left: 24,
                }}
              >
                <XAxis dataKey="timestamp" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary}>
                  <Label
                    angle={270}
                    position="left"
                    style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                  >
                    Count
            </Label>
                </YAxis>
                <Line type="monotone" dataKey="count" stroke={theme.palette.primary.main} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
          }
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
