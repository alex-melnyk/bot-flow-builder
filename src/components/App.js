import React, {Component} from 'react';
import classNames from 'classnames';
import {AppBar, Toolbar, Typography} from "material-ui";
import {withStyles} from 'material-ui/styles';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import GraphContainer from '../containers/GraphContainer';
import DetailsContainer from "../containers/DetailsContainer";
import {SIDEBAR_WIDTH} from "./Sidebar";
import SidebarContainer from "../containers/SidebarContainer";

const styles = (theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
        zIndex: 1
    },
    appBar: {
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        marginLeft: SIDEBAR_WIDTH,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default
    }
});

class App extends Component {
    render() {
        const {
            classes
        } = this.props;

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

                <SidebarContainer/>

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <GraphContainer/>
                </main>

                <DetailsContainer/>
            </div>
        );

    }
}

export default DragDropContext(HTML5Backend)(withStyles(styles)(App));