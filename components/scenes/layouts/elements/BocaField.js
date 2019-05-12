import React from 'react';
import {
    Text,
    View,
    VrButton
} from 'react-vr';
import ChoiceRowLayout from "../ChoiceRowLayout";

//Element
class BocaField extends React.Component {
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
        let player = [
            {
                color: "black",
                value: "Larry: 1"
            },
            {
                color: "black",
                value: "Darlene: 2"
            },
            {
                color: this.props.backgroundColor,
                value: "."
            },
            {
                color: this.props.backgroundColor,
                value: "."
            },
            {
                color: this.props.backgroundColor,
                value: "."
            }
        ]
        let money = [
            {
                color: "black",
                value: "40 grand"
            },
            {
                color: "black",
                value: "90 grand"
            },
            {
                color: this.props.backgroundColor,
                value: "."
            },
            {
                color: this.props.backgroundColor,
                value: "."
            },
            {
                color: this.props.backgroundColor,
                value: "."
            }
        ]
        let fieldDim = {height: 1.8, width: .6, valueFont: .06, dieFont: .09, marginRight: .06};


        let moneyData =
            money.map((item, index) => {
                return <Text
                    style={{
                        fontSize: fieldDim.dieFont,
                        textAlign: 'center',
                        color: item.color,
                    }}>

                    {item.value}
                </Text>

            });
        let playerData =
            player.map((item, index) => {
                return <Text
                    style={{
                        fontSize: fieldDim.dieFont,
                        textAlign: 'center',
                        color: item.color,
                    }}>

                    {item.value}
                </Text>

            });
        return (
            <View
                style={{
                    marginRight: fieldDim.marginRight,
                    height: fieldDim.height,
                    width: fieldDim.width,
                    marginTop: .01,
                    backgroundColor: this.props.backgroundColor,
                    borderWidth: this.state.borderWidth,
                    color: this.props.color,
                    borderColor: this.props.color,
                    borderStyle: "solid"
                }}
            >


                <View style={{
                    margin: 0, flexDirection: "column", alignItems: 'center',

                    justifyContent: 'center'
                }}>
                    <Text
                        style={{
                            fontSize: fieldDim.dieFont,
                            textAlign: 'center',
                            color: this.props.color,
                        }}>
                        {"."}
                    </Text>
                    {moneyData}
                    <Text
                        style={{
                            fontSize: .05,
                            textAlign: 'center',
                            color: "yellow",
                        }}>
                        {"."}
                    </Text>


                    {/* di number*/}
                    <Text
                        style={{
                            fontSize: .2,
                            textAlign: 'center',
                            color: "black",
                        }}>
                        {this.props.value}
                    </Text>


                    {/*players*/}
                    <Text
                        style={{
                            fontSize: .05,
                            textAlign: 'center',
                            color: "yellow",
                        }}>
                        {"."}
                    </Text>

                    {playerData}
                </View>


            </View>
        )
    }
}

module.exports = BocaField;