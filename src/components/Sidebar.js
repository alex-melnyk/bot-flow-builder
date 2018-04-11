import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {Button, Divider, Drawer, List, ListItem, ListSubheader, withStyles} from "material-ui";
import CardBlock from "./common/CardBlock";
import {BlockMocks} from "../types";
import ImportDialog from "./ImportDialog";

export const SIDEBAR_WIDTH = 350;

const styles = (theme) => ({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        position: 'relative',
        width: SIDEBAR_WIDTH
    }
});

class Sidebar extends Component {
    state = {
        showImportDialog: false,
        showExportDialog: false
    };

    renderBlocks = () => (
        BlockMocks.map((block, index) => (
            <ListItem key={uuid()}>
                <CardBlock {...block}/>
            </ListItem>
        ))
    );

    render() {
        const {classes} = this.props;

        return (
            <Drawer
                variant="permanent"
                anchor="left"
                classes={{paper: classes.drawerPaper}}
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    <ListSubheader>
                        Flow blocks
                    </ListSubheader>
                    {this.renderBlocks()}
                    <Divider/>
                    <ListSubheader>
                        Data manipulation
                    </ListSubheader>
                    <ListItem>
                        <Button
                            fullWidth
                            color="primary"
                            variant="raised"
                            onClick={() => this.setState({showImportDialog: true})}
                        >
                            Import
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="raised"
                            onClick={() => this.setState({showExportDialog: true})}
                        >
                            Export
                        </Button>
                    </ListItem>
                </List>

                {
                    this.state.showImportDialog &&
                    <ImportDialog
                        onCloseDialog={() => this.setState({showImportDialog: false})}
                        onDataLoaded={this.props.dataLoadedAction}
                    />
                }
            </Drawer>
        );
    }
}

Sidebar.propTypes = {
    dataLoadedAction: PropTypes.func.isRequired
};

export default withStyles(styles)(Sidebar);