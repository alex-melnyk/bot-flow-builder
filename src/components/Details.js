import React, {Component} from 'react';
import {Avatar, Drawer, Icon, List, ListItem, ListItemAvatar, ListItemText, TextField} from "material-ui";
import {withStyles} from 'material-ui/styles';
import {BlockMocks} from '../types';

const styles = theme => ({
    drawerPaper: {
        width: 350
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    }
});

class Details extends Component {
    render() {
        const {
            classes,
            visible,
            drawerCloseAction,
            selectedNode
        } = this.props;

        const block = BlockMocks.find((block) => block.type === selectedNode.type);

        return (
            <Drawer
                anchor="right"
                open={visible}
                classes={{
                    paper: classes.drawerPaper
                }}
                onClose={drawerCloseAction}
            >
                {
                    block &&
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Icon>{block.icon}</Icon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={block.header}
                                secondary={block.content}
                            />
                        </ListItem>
                        {/*<ListItem>*/}
                        {/*<TextField*/}
                        {/*fullWidth*/}
                        {/*label="Name of block"*/}
                        {/*helperText="Custom block name to easy identify"*/}
                        {/*/>*/}
                        {/*</ListItem>*/}
                        <ListItem>
                            <TextField
                                fullWidth
                                label="Text for block"
                                helperText="Text specified to the block"
                            />
                        </ListItem>
                        {/*<ListItem style={{justifyContent: 'flex-end'}}>*/}
                        {/*<Button*/}
                        {/*variant="raised"*/}
                        {/*color="primary"*/}
                        {/*>*/}
                        {/*Save block*/}
                        {/*<Icon className={classes.rightIcon}>save</Icon>*/}
                        {/*</Button>*/}
                        {/*</ListItem>*/}
                    </List>
                }
            </Drawer>
        );
    }
}

export default withStyles(styles)(Details);