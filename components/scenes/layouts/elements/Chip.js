import React from 'react';
import {
    Cylinder,
    Text,
    View
} from 'react-vr';

//Element
class Chip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "white",
            backgroundColor: "blue",
            zorder:-8

        };
    }

    componentDidMount() {


    }



    render() {

        return (
            <View style={{
                height:1,
                width: 1,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                transform: [
                    {translate: [this.props.x,this.props.y,0]},
                    {translateZ: this.state.zorder}]
            }}>
                <Cylinder
                    radiusBottom={this.props.size}
                    dimHeight={0}
                    segments={32}
                    style={{
                        color: this.props.color,
                        transform: [{translate: [0,0,0]}, {rotateX: 90}],
                    }}
                />
                <Text  style={{
                    color: 'black',
                    fontSize:.3,
                    textAlign: 'left',
                    transform: [{translate: [-0.3,.25,0]}, {rotateX: 0}],
                }}>{this.props.name}</Text>

            </View>
        )
    }
}

module.exports = Chip;