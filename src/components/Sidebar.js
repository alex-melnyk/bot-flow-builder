import React, {Component} from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {Button, Divider, Drawer, List, ListItem, ListSubheader, withStyles} from "material-ui";
import CardBlock from "./common/CardBlock";
import {BlockMocks} from "../types";
import ImportDialog from "./ImportDialog";
import ExportDialog from "./ExportDialog";

export const SIDEBAR_WIDTH = 350;

const styles = (theme) => ({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        position: 'relative',
        width: SIDEBAR_WIDTH
    },
    subheader: {
        backgroundColor: 'white'
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
                    <ListSubheader className={classes.subheader}>
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
                            onClick={() => {
                                this.props.flowExportAction();
                                this.setState({showExportDialog: true});
                            }}
                        >
                            Export
                        </Button>
                    </ListItem>
                </List>

                {
                    this.state.showImportDialog &&
                    <ImportDialog
                        onCloseDialog={() => this.setState({showImportDialog: false})}
                        onDataLoaded={this.props.flowImportAction}
                    />
                }

                {
                    this.state.showExportDialog &&
                    <ExportDialog
                        onCloseDialog={() => this.setState({showExportDialog: false})}
                        content={this.props.exportFlow}
                    />
                }
            </Drawer>
        );
    }
}

Sidebar.propTypes = {
    exportFlow: PropTypes.any,
    flowImportAction: PropTypes.func.isRequired,
    flowExportAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(Sidebar);