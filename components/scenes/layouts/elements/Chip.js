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
        let nn = this.props.name ;
        if(this.props.sizes.length> 1) nn += this.props.sizes;
        let fw = 700;
        if(this.props.textColor != 'red')
            fw = 700

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
                    color: this.props.textColor,
                    fontSize:.3,
                    fontWeight:fw,
                    textAlign: 'left',
                    transform: [{translate: [-0.3,.25,0]}, {rotateX: 0}],
                }}>{nn}</Text>

            </View>
        )
    }
}

module.exports = Chip;
