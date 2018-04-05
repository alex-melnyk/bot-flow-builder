import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppBar, Divider, Drawer, List, ListItem, Toolbar, Typography} from "material-ui";
import {withStyles} from "material-ui/styles";
import Graph from './Graph';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
        zIndex: 1
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        // padding: theme.spacing.unit * 3,
    },
});

class App extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, classes['appBar-left'])}
                >
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            Permanent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        <ListItem button>
                            A
                        </ListItem>
                        <ListItem button>
                            B
                        </ListItem>
                        <ListItem button>
                            C
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            A
                        </ListItem>
                        <ListItem button>
                            B
                        </ListItem>
                        <ListItem button>
                            C
                        </ListItem>
                    </List>
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Graph/>
                </main>
            </div>
        );

    }
}

export default withStyles(styles)(App);