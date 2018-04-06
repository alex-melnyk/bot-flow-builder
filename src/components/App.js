import React, {Component} from 'react';
import uuid from 'uuid';
import classNames from 'classnames';
import {AppBar, Divider, Drawer, Grow, List, ListItem, ListSubheader, Toolbar, Typography} from "material-ui";
import {withStyles} from 'material-ui/styles';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import GraphContainer from '../containers/GraphContainer';
import CardBlock from "./common/CardBlock";
import {BlockMocks} from "../types";

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
    renderBlocks = () => (
        BlockMocks.map((block, index) => (
            <ListItem key={uuid()}>
                <Grow in={true} timeout={1500 * index}>
                    <CardBlock {...block}/>
                </Grow>
            </ListItem>
        ))
    );

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
                        {this.renderBlocks()}
                    </List>
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <GraphContainer/>
                </main>
            </div>
        );

    }
}

export default DragDropContext(HTML5Backend)(withStyles(styles)(App));