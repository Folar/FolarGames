import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

const {Choice} = require('./../../../utils/Choice.js');
import ChoiceGaitLayout from './ChoiceGaitLayout.js';
import ChoiceDiceLayout from './ChoiceDiceLayout.js'
import BocaFieldsLayout from './BocaFieldsLayout.js';
import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';

let _this = null;
choiceThis = null;
let choice = new Choice();
let colors = ["yellow", "cyan", "pink", "green", "orange", "#b19cd9"];

//Layout
class BocaLayout extends React.Component {

    constructor(props) {
        super(props);
        choiceThis = this;

        this.state = {
            choiceData: {},
            bocaData: {
                players: ['Larry', 'Mary', 'Nancy', 'Alan', 'Huy'],
                fieldColors:["yellow", "cyan", "pink", "green", "orange", "#b19cd9"],
                money: [
                    [
                        {
                            color: "black",
                            value: "60 grand"
                        },
                        {
                            color: "black",
                            value: "40 grand"
                        }
                    ],
                    [
                        {
                            color: "black",
                            value: "50 grand"
                        }
                    ],
                    [
                        {
                            color: "black",
                            value: "10 grand"
                        },
                        {
                            color: "black",
                            value: "10 grand"
                        },
                        {
                            color: "black",
                            value: "10 grand"
                        },
                        {
                            color: "black",
                            value: "10 grand"
                        },
                        {
                            color: "black",
                            value: "10 grand"
                        }
                    ],
                    [
                        {
                            color: "black",
                            value: "50 grand"
                        }
                    ],
                    [
                        {
                            color: "black",
                            value: "80 grand"
                        }
                    ],
                    [
                        {
                            color: "black",
                            value: "70 grand"
                        }
                    ]
                ],
                fieldPlayers: [
                    [
                        {
                            color: "black",
                            name: "Larry",
                            value: 4
                        },
                        {
                            color: "black",
                            name: "Nancy",
                            value: 4
                        }
                    ],
                    [
                        {
                            color: "black",
                            name: "Huy",
                            value: 4
                        }
                    ],
                    [
                        {
                            color: "black",
                            name: "Nancy",
                            value: "4"
                        },
                        {
                            color: "black",
                            name: "Alan",
                            value: 3
                        },
                        {
                            color: "black",
                            name: "Mary",
                            value: 2
                        },
                        {
                            color: "black",
                            name: "Huy",
                            value: 1
                        },
                        {
                            color: "black",
                            name: "Larry",
                            value: 1
                        }
                    ],
                    [
                        {
                            color: "black",
                            name: "Mary",
                            value: 1
                        }
                    ],
                    [
                        {
                            color: "black",
                            name: "Alan",
                            value: 4
                        }
                    ],
                    [
                        {
                            color: "black",
                            name: "Mary",
                            value: 3
                        }
                    ]
                ]
            },
            zorder: this.props.zorder,
            choiceShowButton: true,
            choiceButtonText: "Roll!!!",

        };

    }

    componentDidMount() {

    }

    roll(dice) {
        //this.client.send(JSON.stringify({name:this.state.name,type:"choiceRoll",dice:dice,
        //    buttonText:this.state.choiceButtonText}));

        if (this.state.choiceButtonText == "Confirm") {
            let gs = choice.confirm();
            this.setState({choiceData: gs});
            if (gs.gameState == 3)
                this.setState({choiceButtonText: "Again?"});
            else
                this.setState({choiceButtonText: "Roll!!!"});

        } else if (this.state.choiceButtonText == "Roll!!!") {
            this.setState({choiceData: choice.roll(dice)});
            this.setState({choiceShowButton: false});
        } else {
            this.setState({choiceData: choice.resetState(dice)});
            this.setState({choiceButtonText: "Roll!!!"});
        }
    }

    chooseDicePair(rank, pos, gaitor) {
        //this.client.send(JSON.stringify({name:this.state.name,type:"choosePairs",rank:rank,pos:pos,gaitor:gaitor}));
        let s = choice.setSecondDieChoices(rank, pos, gaitor);
        this.setState({choiceShowButton: s.gameState != 1});
        if (s.gameState == 0) {
            this.setState({choiceButtonText: "Roll!!!"});
        } else {
            this.setState({choiceButtonText: "Confirm"});
        }
        this.setState({choiceData: s});
    }

    getMessage() {
        if (this.state.choiceData == null)
            return "Press Roll";
        let m = this.state.choiceData.message;
        if (m != null) {
            return m;
        }
        return "Press Roll";
    }

    render() {


        let nameList = ["glu", "gfy"].map((item, index) => {
            return <Text style={{color: "black"}} key={index}>{item}</Text>
        });
        return (
            <View>


                <View style={{
                    height: 2,
                    width: 5,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    layoutOrigin: [.5, .8],
                    transform: [
                        {translateX: 0},
                        {translateZ: this.state.zorder}]
                }}>
                    <ChoiceDiceLayout style={{marginBottom: .2}} roll={this.roll.bind(this)}
                                      choiceShowButton={this.state.choiceShowButton}
                                      choiceButtonText={this.state.choiceButtonText} num={8}
                                      init={['B', 'O', 'C', 'A', 'D', 'I', 'C', 'E']}
                                      clickable={true}/>
                    <View style={{
                        height: 1,
                        width: 5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        < BocaFieldsLayout bocaData={this.state.bocaData}
                                           chooseDicePair={this.chooseDicePair.bind(this)}/>
                        <ChoiceGaitLayout message={this.getMessage()} choiceData={this.state.choiceData}
                                          chooseDicePair={this.chooseDicePair.bind(this)}/>
                        <View style={{
                            height: 3,
                            width: 1,
                            marginLeft: .04,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start'
                        }}>
                            {nameList}
                        </View>

                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = BocaLayout;
