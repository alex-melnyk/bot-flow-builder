import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, DialogTitle, Input, withStyles} from "material-ui";

const styles = (theme) => ({});

class ImportDialog extends Component {
    render() {
        return (
            <Dialog
                open={true}
                onClose={this.props.onCloseDialog}
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <Input
                        inputRef={(ref) => this.upload = ref}
                        type="file"
                        fullWidth
                        onChange={() => {
                            const file = this.upload.files[0];

                            if (file && file.type === 'application/json') {
                                console.log('Upload', file.size);

                                const reader = new FileReader();
                                reader.onload = () => {
                                    const data = JSON.parse(reader.result);
                                    console.log('RESULT', data);

                                    this.props.onDataLoaded(data);
                                    this.props.onCloseDialog();
                                };
                                reader.readAsText(file);
                            }
                        }}
                    />
                </DialogContent>
            </Dialog>
        );
    }
}

ImportDialog.propTypes = {
    onCloseDialog: PropTypes.func.isRequired,
    onDataLoaded: PropTypes.func.isRequired
};

export default withStyles(styles)(ImportDialog);