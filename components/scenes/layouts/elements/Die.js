import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';

//Element
class Die extends React.Component {
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
            this.props.pickCard(this.props.card, this.props.row);
    }

    render() {

        return (
            <View
                style={{
                    marginRight: this.props.dim.marginRight,
                    height: this.props.dim.height,
                    width: this.props.dim.width,
                    marginTop:.01,
                    backgroundColor: this.props.backgroundColor,
                    borderWidth: this.state.borderWidth,
                    color: this.props.color,
                    borderColor: this.props.color,
                    borderStyle: "solid"
                }}
            >
                <VrButton onClick={this.invoke.bind(this)}>


                    <View style={{
                        margin: 0, flexDirection: 'row', alignItems: 'center',

                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                                fontSize: this.props.dim.dieFont,
                                textAlign: 'center',
                                color: "black",
                            }}>

                            {this.props.value}
                        </Text>
                    </View>

                </VrButton>
            </View>
        )
    }
}

module.exports = Die;
