import React, {Component} from 'react';
import classNames from 'classnames';
import {AppBar, Divider, Drawer, Grow, List, ListItem, ListSubheader, Toolbar, Typography} from "material-ui";
import {withStyles} from 'material-ui/styles';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Graph from './Graph';
import CardBlock from "./common/CardBlock";

const drawerWidth = 350;

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
        backgroundColor: theme.palette.background.default
    },
    card: {
        flex: 1
    }
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
                    <div className={classes.toolbar}/>
                    <Divider/>
                    <List>
                        <ListSubheader>Flow blocks</ListSubheader>
                        <ListItem>
                            <Grow in={true} timeout={0}>
                                <CardBlock
                                    icon="play_for_work"
                                    header="Start"
                                    content="Base block to start from."
                                />
                            </Grow>
                        </ListItem>
                        <ListItem>
                            <Grow in={true} timeout={500}>
                                <CardBlock
                                    icon="help_outline"
                                    header="Question"
                                    content="Block to ask something."
                                />
                            </Grow>
                        </ListItem>
                        <ListItem>
                            <Grow in={true} timeout={1000}>
                                <CardBlock
                                    icon="call_split"
                                    header="Variant"
                                    content="Block to provide answer variant."
                                />
                            </Grow>
                        </ListItem>
                        <ListItem>
                            <Grow in={true} timeout={1500}>
                                <CardBlock
                                    icon="priority_high"
                                    header="Answer"
                                    content="Block to provide message after answer."
                                />
                            </Grow>
                        </ListItem>
                    </List>
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Graph/>
                </main>
            </div>
        );

    }
}

export default DragDropContext(HTML5Backend)(withStyles(styles)(App));