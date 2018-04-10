import React, {Component} from 'react';
import {Avatar, Card, CardHeader, Icon} from "material-ui";
import {blue} from "material-ui/colors";
import {withStyles} from 'material-ui/styles';
import {DragSource} from 'react-dnd';

const styles = theme => ({
    card: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    avatar: {
        backgroundColor: blue[500]
    }
});


class CardBlock extends Component {
    renderAvatar = (icon) => (
        icon &&
        <div>
            <Avatar className={this.props.classes.avatar}>
                <Icon>{icon}</Icon>
            </Avatar>
        </div>
    );

    render() {
        const {
            classes,
            isDragging,
            connectDragSource,
            icon,
            header,
            content
        } = this.props;

        return connectDragSource(
            <div style={{flex: 1}}>
                <Card
                    className={classes.card}
                    style={{opacity: isDragging ? 0.5 : 1}}
                >
                    <CardHeader
                        avatar={this.renderAvatar(icon)}
                        title={header}
                        subheader={content}
                    />
                </Card>
            </div>
        );
    }
}

export default DragSource('card', {
    beginDrag: (props) => ({type: props.type})
}, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
}))(withStyles(styles)(CardBlock));