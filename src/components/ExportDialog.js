import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, CircularProgress, DialogContent, DialogContentText, DialogTitle, withStyles} from "material-ui";

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
                    {
                        this.props.content
                            ? (
                                <DialogContentText>
                                    <pre><code>{JSON.stringify(this.props.content, null, '\t')}</code></pre>
                                </DialogContentText>
                            )
                            : (
                                <div style={{textAlign: 'center'}}>
                                    <CircularProgress size={50} />
                                </div>
                            )
                    }

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