import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

const {Choice} = require('./../../../utils/Choice.js');
import BocaTextScoreLayout from './BocaTextScoreLayout.js';
import ChoiceDiceLayout from './ChoiceDiceLayout.js'
import BocaFieldsLayout from './BocaFieldsLayout.js';


let _this = null;
choiceThis = null;
let choice = new Choice();
let colors = ["yellow", "cyan", "pink", "green", "orange", "#b19cd9"];
let cp = {colors: ["yellow", "cyan", "pink", "green", "orange", "#b19cd9"]};
let fp = {
    players: [


        [
            {
                color: "black",
                name: "Nancy",
                value: 5
            },
            {
                color: "black",
                name: "Huy",
                value: 4
            },
            {
                color: "black",
                name: "Larry",
                value: 3
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
                value: 4
            },
            {
                color: "black",
                name:
                    "Alan",
                value:
                    3
            }
            ,
            {
                color: "black",
                name:
                    "Mary",
                value:
                    2
            }
            ,
            {
                color: "black",
                name:
                    "Huy",
                value:
                    1
            }
            ,
            {
                color: "black",
                name:
                    "Larry",
                value:
                    1
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
        []
    ]
}
let mon = {
    money: [
        [
            {
                color: "black",
                value: 60
            },
            {
                color: "black",
                value: 40
            }
        ],
        [
            {
                color: "black",
                value: 50
            }
        ],
        [
            {
                color: "black",
                value: 10
            },
            {
                color: "black",
                value: 10
            },
            {
                color: "black",
                value: 10
            },
            {
                color: "black",
                value: 10
            },
            {
                color: "black",
                value: 10
            }
        ],
        [
            {
                color: "black",
                value: 90
            }
        ],
        [
            {
                color: "black",
                value: 80
            }
        ],
        [
            {
                color: "black",
                value: 70
            }
        ]
    ]
}


//Layout
class BocaLayout extends React.Component {

    constructor(props) {
        super(props);
        choiceThis = this;

        this.state = {
            choiceData: {},
            bocaData: {
                player: 'Alan',
                players: [
                    {
                        name: 'Larry',
                        money: 70,
                        diceLeft :4
                    },
                    {
                        name: 'Mary',
                        money: 40,
                        diceLeft :8
                    },
                    {
                        name: 'Nancy',
                        money: 40,
                        diceLeft :5
                    },
                    {
                        name: 'Alan',
                        money: 30,
                        diceLeft :4
                    }, {
                        name: 'Huy',
                        money: 20,
                        diceLeft :4
                    }],
                fieldColors: ["yellow", "cyan", "pink", "green", "orange", "#b19cd9"],
                money: mon.money,
                fieldPlayers: fp.players,
                round:1,
                currentPlayer:"Nancy",
                currentIndex:2
            },
            zorder: this.props.zorder,
            choiceShowButton:
                true,
            choiceButtonText:
                "Roll!!!",

        }
        ;

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

    compare(a, b) {
        return (a.value - b.value) * -1;
    }

    selectDice(di, qty) {


        //this.refs.cdl.setDice([1,2,33,4,5,6,6,7]);
        let cs = JSON.parse(JSON.stringify(cp))
        let ps = JSON.parse(JSON.stringify(fp));

        this.state.bocaData.fieldColors = cs.colors;
        this.state.bocaData.fieldColors[di - 1] = "gray";

        this.state.bocaData.fieldPlayers = ps.players;
        let fplayers = this.state.bocaData.fieldPlayers[di - 1];
        let addPlayer = true;

        for (let i = 0; i < fplayers.length; i++) {
            debugger;
            if (fplayers[i].name == this.state.bocaData.currentPlayer) {
                fplayers[i].value = fplayers[i].value + qty;
                addPlayer = false;
            }
        }
        if (addPlayer)

            fplayers.push({
                color: "black",
                name: this.state.bocaData.currentPlayer,
                value: qty
            })
        fplayers.sort(this.compare)

        this.setState({bocaData: this.state.bocaData});

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
                    <ChoiceDiceLayout  ref="cdl"  style={{marginBottom: .2}} roll={this.roll.bind(this)}
                                      choiceShowButton={this.state.choiceShowButton}
                                      choiceButtonText={this.state.choiceButtonText}
                                       num={this.state.bocaData.players[this.state.bocaData.currentIndex].diceLeft}
                                      init={['B', 'O', 'C', 'A', 'D', 'I', 'C', 'E']}
                                      clickable={true} selectDice={this.selectDice.bind(this)}/>
                    <View style={{
                        height: 1,
                        width: 5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        < BocaFieldsLayout bocaData={this.state.bocaData}
                                           chooseDicePair={this.chooseDicePair.bind(this)}/>
                        <BocaTextScoreLayout message={this.getMessage()} bocaData={this.state.bocaData}/>


                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = BocaLayout;
