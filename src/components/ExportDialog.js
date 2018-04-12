import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input,
    withStyles
} from "material-ui";

const styles = (theme) => ({});

class ExportDialog extends Component {
    render() {
        return (
            <Dialog
                open={true}
                onClose={this.props.onCloseDialog}
            >
                <DialogTitle>
                    Here is source code of your flow:
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <code>{this.props.content}</code>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="raised"
                        onClick={this.props.onCloseDialog}
                    >OK</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ExportDialog.propTypes = {
    content: PropTypes.any,
    onCloseDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(ExportDialog);