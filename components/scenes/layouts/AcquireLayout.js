import React from 'react';
import {
    View,
    Text
} from 'react-vr';


import AcquireBoardLayout from './AcquireBoardLayout.js';
import AcquireHotelStats from './AcquireHotelStats.js';






//Layout
class AcquireLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            choiceData: {},
            bocaData:  this.props.bocaData,

            zorder: this.props.zorder-1,
            di:0,
            qty:0

        }
        ;

    }

    componentDidMount() {

    }

    roll(dice,di,diceX,diX) {
        let idx = di != -1? dice[di]-1 :diceX[diX]- 1;
        if(this.state.bocaData.buttonText ==  "Confirm"){

            this.state.bocaData.buttonText = "";
            this.state.bocaData.message = "Continue to next player";
            this.setState({bocaData: this.state.bocaData});
            this.props.sendBocaMessage({
                name: this.props.player, action: "rollBocaDice",type:"BOCA",
                dice: dice, selectedDice: di,
                diceX: diceX, selectedDiceX: diX,
                fld:this.state.bocaData.fieldPlayers[idx],
                qty:this.state.qty,
                qtyX:this.state.qtyX
            });
        } else {
            this.state.bocaData.buttonText = "";
            this.state.bocaData.message = "Select a dice and then press Confirm";
            this.setState({bocaData: this.state.bocaData});
            this.props.sendBocaMessage({
                name: this.props.player, action: "rollBocaDice",type:"BOCA",
                dice: dice, selectedDice: -1,
                diceX: diceX, selectedDiceX: -1
            });
        }
    }




    getMessage() {
        if (this.props.bocaData == undefined)
            return "Press Roll";
        let m = this.props.bocaData.message;
        if (m != null) {
            return m;
        }
        return "Press Roll";
    }
    setDice(dice,sel,diceX,selX){
        this.refs.cdl.setDice(dice,sel,diceX,selX);

    }
    resetDice(){
        this.refs.cdl.resetDice();

    }

    setData(d){
        this.setState({bocaData:d});

    }
    canClick(){
        return (this.state.bocaData.buttonText.length == 0 || this.state.bocaData.buttonText =="Confirm")&&
            this.props.player == this.state.bocaData.currentPlayer;
    }
    canShow(){
        return this.state.bocaData.buttonText.length>0 &&
            this.state.bocaData.buttonText !="Pass Dice" &&  this.state.bocaData.buttonText !="Finish" &&
            (this.state.bocaData.buttonText =="Start"||
            this.state.bocaData.buttonText =="Restart"||
            this.props.player == this.state.bocaData.currentPlayer)
    }
    selectDice(di, qty, qtyX) {

        let cs = JSON.parse(JSON.stringify({colors: this.state.bocaData.ofieldColors}));
        let ps = JSON.parse(JSON.stringify({players: this.state.bocaData.ofieldPlayers}));

        this.state.bocaData.fieldColors = cs.colors;
        this.state.bocaData.fieldColors[di - 1] = "gray";

        this.state.bocaData.fieldPlayers = ps.players;
        let fplayers = this.state.bocaData.fieldPlayers[di - 1];
        let addPlayer = true;
        let tot = 0;

        if(qty != 0) {
            for (let i = 0; i < fplayers.length; i++) {
                if (fplayers[i].name == this.state.bocaData.currentPlayer) {
                    tot = fplayers[i].value = fplayers[i].value + qty;
                    addPlayer = false;
                }
            }
            if (addPlayer) {
                tot = qty;
                fplayers.push({
                    color: "black",
                    name: this.state.bocaData.currentPlayer,
                    value: qty
                });
            }
        }
        let totX=0;
        addPlayer= true;
        if(qtyX != 0) {
            for (let i = 0; i < fplayers.length; i++) {
                if ("@House" == fplayers[i].name) {
                    totX = fplayers[i].value = fplayers[i].value + qtyX;
                    addPlayer = false;
                }
            }
            if (addPlayer) {
                totX = qtyX;
                fplayers.push({
                    color: "black",
                    name: "@House",
                    value: qtyX
                });
            }
        }
        fplayers = fplayers.sort(this.compare);
        this.state.bocaData.buttonText="Confirm";
        let msg1 = "";
        let msg2 = "";
        if (tot > 0){
            msg1 = ", you now have " + tot +" die on the " +di;
            if (totX > 0){
                msg1 += " and";
            }
        }

        if (totX > 0){
            if (tot == 0)
                msg2 =","
            msg2 += " the house has " + totX +" die on the " +di;
        }
        this.props.bocaData.message = "You clicked on the "+di + msg1 +msg2 + ".";
        this.setState({bocaData:this.state.bocaData,di:di,qty:qty,diX:di,qtyX:qtyX});



    }
    compare(a, b) {
        return (a.value - b.value) * -1;
    }

    render() {

        return (
            <View>


                <View style={{
                    height: 2,
                    width: 7,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    layoutOrigin: [.5, 1],
                    transform: [
                        {translateX: 0},
                        {translateZ: this.state.zorder}]
                }}>


                    <View style={{
                        height: 1,
                        width: 5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        <AcquireBoardLayout/>
                        <AcquireHotelStats/>


                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = AcquireLayout;
