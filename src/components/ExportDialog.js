import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, withStyles} from "material-ui";

const styles = (theme) => ({});

class ExportDialog extends Component {
    downloadFile = () => {
        const dataUrl = URL.createObjectURL(new Blob([JSON.stringify(this.props.content)], {type: 'application/json'}));

        const anchor = document.createElement("a");
        anchor.href = dataUrl;
        anchor.download = `flow_${new Date().getTime()}.json`;

        document.body.appendChild(anchor);
        anchor.click();

        setTimeout(function () {
            document.body.removeChild(anchor);
            window.URL.revokeObjectURL(dataUrl);
        }, 0);
    };

    render() {
        return (
            <Dialog
                fullScreen={true}
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
                                <pre style={{whiteSpace: 'pre-wrap'}}>
                                    {JSON.stringify(this.props.content, null, '\t')}
                                </pre>
                            )
                            : (
                                <div style={{textAlign: 'center'}}>
                                    <CircularProgress size={50}/>
                                </div>
                            )
                    }

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="raised"
                        onClick={this.props.onCloseDialog}
                    >Close</Button>
                    <Button
                        color="primary"
                        variant="raised"
                        onClick={this.downloadFile}

                    >Download</Button>
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