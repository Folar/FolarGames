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



    render() {


        let fieldDim = {height: 2, width: .55, valueFont: .06, dieFont: .09, marginRight: .06};

        let moneyless = [];
        debugger;
        for (let i = 0;i < 5 - this.props.money.length;i++)
            moneyless.push(i);
        let moneyData =
            this.props.money.map((item, index) => {
                return <Text
                    style={{
                        fontSize: fieldDim.dieFont,
                        textAlign: 'center',
                        color: item.color,
                    }}>

                    {item.value + " grand"}
                </Text>

            });
        let nomoney =
            moneyless.map((item, index) => {
                return <Text
                    style={{
                        fontSize: fieldDim.dieFont,
                        textAlign: 'center',
                        color: this.props.backgroundColor,
                    }}>

                    {"11 grand"}
                </Text>

            });
        let playerData =
            this.props.players.map((item, index) => {
                return <Text
                    style={{
                        fontSize: fieldDim.dieFont,
                        textAlign: 'center',
                        color: item.color,
                    }}>

                    {item.name +": "+item.value}
                </Text>

            });
        let playerless = [];
        for (let i = 0;i < 5 - this.props.players.length;i++)
            playerless.push(i)
        let noplayers =
            playerless.map((item, index) => {
                return <Text
                    style={{
                        fontSize: fieldDim.dieFont,
                        textAlign: 'center',
                        color: this.props.backgroundColor,
                    }}>

                    {"Www#w: 0"}
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
                    {nomoney}


                    <Text
                        style={{
                            fontSize: .05,
                            textAlign: 'center',
                            color: this.props.color,
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
                            color: this.props.color,
                        }}>
                        {"."}
                    </Text>

                    {playerData}
                    {noplayers}

                </View>


            </View>
        )
    }
}

module.exports = BocaField;
