import React, {Component} from 'react';
import {Drawer} from "material-ui";
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    drawerPaper: {
        width: 350
    }
});

class Details extends Component {
    render() {
        const {
            classes,
            visible,
            drawerCloseAction
        } = this.props;

        return (
            <Drawer
                anchor="right"
                open={visible}
                classes={{
                    paper: classes.drawerPaper
                }}
                onClose={drawerCloseAction}
            />
        );
    }
}

export default withStyles(styles)(Details);