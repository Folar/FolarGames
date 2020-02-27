import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';

//Element
class TileClickable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "white",
            backgroundColor: "blue",
            borderWidth: 0,
            value: 1,
            state: 1

        };
    }

    componentDidMount() {


    }

    invoke() {
        if (this.props.clickable)
            this.props.chooseDicePair(this.props.row, this.props.column,this.props.gaitor);
    }

    render() {

        return (
            <View
                style={{
                    marginRight: this.props.dim.marginRight,
                    height: this.props.dim.height,
                    width: this.props.dim.width,
                    backgroundColor: this.props.backgroundColor,
                    borderWidth: this.state.borderWidth,
                    color: this.props.color,
                    borderColor: this.props.color,
                    opacity:this.props.dim.opacity,
                    borderStyle: "solid",
                    flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <VrButton onClick={this.invoke.bind(this)}>


                    <View style={{
                        margin: 0, flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                                fontSize: this.props.dim.dieFont,fontWeight:this.props.dim.fontWeight,
                                textAlign: 'center',
                                color: this.props.color,
                            }}>

                            {this.props.value}
                        </Text>
                    </View>

                </VrButton>
            </View>
        )
    }
}

module.exports = TileClickable;
