import React from 'react';
import {
    Cylinder,
    Text,
    View
} from 'react-vr';

//Element
class Flag extends React.Component {
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
                    radiusBottom={.1}
                    dimHeight={0}
                    segments={32}
                    style={{
                        color: 'red',
                        transform: [{translate: [0,0,0]}, {rotateX: 90}],
                    }}
                />
                <Text  style={{
                    color: 'white',
                    fontSize:.7,
                    textAlign: 'left',
                    transform: [{translate: [-0.2,.5,0]}, {rotateX: 0}],
                }}>X</Text>

            </View>
        )
    }
}

module.exports = Flag;
