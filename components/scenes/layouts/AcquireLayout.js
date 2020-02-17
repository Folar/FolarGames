import React from 'react';
import {
    View,
    Text
} from 'react-vr';


import AcquireBoardLayout from './AcquireBoardLayout.js';
import AcquireHotelStats from './AcquireHotelStats.js';
import AcquirePlayerStats from './AcquirePlayerStats.js';
import AcquireDialogLayout from './AcquireDialogLayout.js';




//Layout
class AcquireLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            acquireData:this.props.data,
            name:"",
            stk:this.props.data.stk,
            merger:this.props.data.merger,
            hotels:this.props.data.hotels,
            players:this.props.data.players,
            buy: this.props.data.buy,
            buttonText:this.props.data.buttonText,
            playerIndex:0,
            zorder: this.props.zorder-.8,
            di:0,
            qty:0

        };
        this.lastCmd = "";
        this.lastArgs = "";

    }
    setData(d){
        this.setState({acquireData:d,stk:d.stk,merger:d.merger,buy:d.buy,players:d.players,hotels:d.hotels,
        name:this.props.name,buttonText:d.buttonText });

    }
    componentDidMount() {

    }

    index(str){
        return ["Luxor","Tower","American","Worldwide","Festival","Continental","Imperial"].indexOf(str);
    }

    invokeServer(cmd,args) {
        console.log("command " + cmd);
        let hotels = ["Luxor", "Tower", "American", "Worldwide", "Festival", "Continental", "Imperial"];

        this.lastCmd = cmd;
        this.lastArgs = JSON.stringify(args);
        switch(cmd) {
            case  "Reload":
                this.props.playAgain();
            case "Start":
                this.props.sendmessage({type:"ACQ",name: this.props.name, action: 100,args:{dummy:1}});
                break;
            case "End":
                let b = {state:101};
                if(this.props.data.gameState == 102){
                    b ={amt:this.state.acquireData.buy.amt,hotels:this.state.acquireData.buy.hotels,state:102};
                }
                this.props.sendmessage({type:"ACQ",name: this.props.name, action: 108,args:b});
                break;
            case "PlaceTile":

                let d = this.props.data;

                if(d.gameState != 101){
                    d.instructions = "Can not click on this tile, it is not your turn or not time to place a tile";
                    this.setState({acquireData:d});
                    return;
                }
                let t = d.tiles[args.row][args.column];
                console.log("tile state "+t.rackState);
                if (t.rackState == 'n')
                    debugger;
                if (!t.inRack){
                    d.instructions = "the tile that you clicked is not in the rack";
                    this.setState({acquireData:d});
                    return;
                }
                if (t.rackState =='n'){
                    d.instructions = "the tile that you clicked can not be played  at this time";
                    this.setState({acquireData:d});
                    return;
                }
                if (t.rackState =='d'){
                    d.instructions = "the tile that you clicked is dead";
                    this.setState({acquireData:d});
                    return;
                }
                d.instructions = "";
                this.setState({acquireData:d});
                this.props.sendmessage({type:"ACQ",name: this.props.name, action: 101,args:args});
                break;

            case "StartHotel":

                d = this.props.data;
                if(d.gameState != 103){
                    d.instructions = "Can not click on hotel tiles, it is not your turn or not time to buy a hotel";
                    this.setState({acquireData:d});
                    return;
                }
                if (d.hotels[args.row].size != 0) {
                    d.instructions = "Can not click on this hotel tile, it is defunct";
                    this.setState({acquireData:d});
                    return;
                }

                d.instructions = "";
                this.setState({acquireData:d});
                this.props.sendmessage({type:"ACQ",name: this.props.name, action: 103,args:args});
                break;
            case "BuyHotels":
                this.props.sendmessage({type:"ACQ",name: this.props.name, action: 102,args:args});
                break;
            case "ChooseOrder":
                this.props.sendmessage({type:"ACQ",name: this.props.name, action: 105,args:args});
                break;
            case "Trade":
                this.props.sendmessage({type:"ACQ",name: this.props.name, action: 104,
                    args:args});
        }


    }

    incrHotel(cnt){

        this.state.buy.error = "";
        let hotelIndex = this.index(this.state.buy.hotels[cnt]);
        let pi = this.getPlayerIndex(this.props.name);
        let player = this.state.players[pi];
        if( this.state.buy.amt[cnt] == 3 ||
            this.state.buy.amt[cnt] == this.state.hotels[hotelIndex].available||
            (this.state.buy.amt[cnt] + 1)* this.state.hotels[hotelIndex].price > this.state.buy.playerBaseMoney) return;

        let tot = 0;
        for (let j = 0;j<this.state.buy.hotels.length;j++){
            tot += this.state.buy.amt[j];
        }
        if(tot == 3){

            for (let j = 0;j<this.state.buy.hotels.length;j++){
                if (j == cnt ||  this.state.buy.amt[j] == 0) continue;
                this.state.buy.amt[j]--;
                let idx  = this.index(this.state.buy.hotels[j]);
                player.hotels[idx]--;
                this.state.hotels[idx].available++;
                player.money += this.state.hotels[idx].price;
            }
        }
        this.state.buy.amt[cnt]++;
        player.hotels[hotelIndex]++;
        this.state.hotels[hotelIndex].available--;
        player.money -= this.state.hotels[hotelIndex].price;

        if(player.money  < 0){
            for (let j = 0;j<this.state.buy.hotels.length;j++){
                if (j == cnt ||  this.state.buy.amt[j] == 0) continue;
                let idx  = this.index(this.state.buy.hotels[j]);
                for(k = 0;k<this.state.buy.amt[j];k++){
                    this.state.buy.amt[j]--;
                    player.hotels[idx]--;
                    this.state.hotels[idx].available++;
                    player.money += this.state.hotels[idx].price;
                    if(player.money >= 0) break;
                }
                if(player.money >= 0) break;
            }
        }
        let x = (this.state.buy.playerBaseMoney - player.money);
        this.state.buy.info = "Cost $"+ x;

        this.setState({buy:this.state.buy,hotels:this.state.hotels,players:this.state.players})
    }

    invoke(type,cnt){
        switch (type) {
            case "buyHotel":
                debugger;
                let d = this.props.data;
                let t = d.tiles[cnt.row][cnt.column];
                if(t.state > 7){
                    this.state.buy.error = "You must click on a board tile associated with a buyable hotel"

                    this.setState({buy:this.state.buy})
                    return;
                }
                let hn =["Luxor", "Tower", "American", "Worldwide", "Festival", "Continental", "Imperial"][t.state];
                let hi = this.state.buy.hotels.indexOf(hn);

                if(hi == -1){
                    this.state.buy.error = "You can not buy hotel "+hn+ " right now"

                    this.setState({buy:this.state.buy})
                    return;
                }
                this.incrHotel(hi);
                return;

            case "increaseHotel":
                this.incrHotel(cnt);
                break;
            case "reduceHotel":
                this.state.buy.error = "";
                let hotelIndex = this.index(this.state.buy.hotels[cnt]);
                let pi = this.getPlayerIndex(this.props.name);
                let player = this.state.players[pi];

                if (this.state.buy.amt[cnt]== 0) return;
                this.state.buy.amt[cnt]--;
                player.hotels[hotelIndex]--;
                this.state.hotels[hotelIndex].available++;
                player.money += this.state.hotels[hotelIndex].price;
                x = (this.state.buy.playerBaseMoney - player.money);

                this.state.buy.info = "Cost $"+ x;
                this.setState({buy:this.state.buy,hotels:this.state.hotels,players:this.state.players})
                break;
            case "switchHotels":
                if(this.state.merger.oneTouch){
                    let tempHotel = this.state.merger.hotels[cnt];
                    let tempColor = this.state.merger.hotelColors[cnt];
                    let idx = 0;
                    for (let i = 0;i< this.state.merger.hotels.length;i++ )
                        if (i != cnt &&
                            this.state.merger.hotelSizes[i] == this.state.merger.hotelSizes[cnt]  ) {
                            this.state.merger.hotels[cnt] = this.state.merger.hotels[i];
                            this.state.merger.hotelColors[cnt] = this.state.merger.hotelColors[i];
                            this.state.merger.hotels[i] = tempHotel;
                            this.state.merger.hotelColors[i] = tempColor;
                            break;
                        }

                } else {
                    if(this.state.merger.clickCount == 0){
                        this.state.merger.clickCount = 1;
                        this.state.merger.tempColor = this.state.merger.hotelColors[cnt];
                        this.state.merger.hotelColors[cnt] ="black";
                        this.state.merger.sourceIndex =cnt;
                        this.state.merger.info = "Choose the position where you want to place "+ this.state.merger.hotels[cnt];
                    } else {
                        this.state.merger.clickCount = 0;
                        if(cnt!=this.state.merger.sourceIndex) {
                            this.state.merger.info = "Choose the hotel that you want to switch";
                            let tempHotel = this.state.merger.hotels[cnt];
                            let tempColor = this.state.merger.hotelColors[cnt];
                            this.state.merger.hotelColors[cnt] = this.state.merger.tempColor;
                            this.state.merger.hotels[cnt] = this.state.merger.hotels[this.state.merger.sourceIndex];
                            this.state.merger.hotels[this.state.merger.sourceIndex] = tempHotel;
                            this.state.merger.hotelColors[this.state.merger.sourceIndex] = tempColor;
                        }else{
                            this.state.merger.info = "Choose the hotel that you want to switch";
                            this.state.merger.hotelColors[cnt] = this.state.merger.tempColor;
                        }

                    }

                }
                this.setState({merger:this.state.merger})
                break;
            case "SwapV":
                let idxS = this.index(this.state.stk.survivor);
                let idxD = this.index(this.state.stk.defunct);
                if (cnt < this.state.stk.swap){
                    this.state.stk.keep += (this.state.stk.swap - cnt)
                } else if (cnt > this.state.stk.swap) {
                    if(cnt <= this.state.stk.keep+this.state.stk.swap)
                        this.state.stk.keep = this.state.stk.keep +this.state.stk.swap -cnt;
                    else{
                        this.state.stk.sell = this.state.stk.total - cnt ;
                        this.state.stk.keep = 0;
                    }

                }
                this.state.stk.swap = cnt;

                this.state.players[this.state.stk.player].money = this.state.stk.playerMoneyBase + this.state.stk.sell * this.state.stk.defunctPrice;
                this.state.hotels[idxS].available = this.state.stk.hotelAvailSurvivorBase - this.state.stk.swap/2;
                this.state.hotels[idxD].available = this.state.stk.hotelAvailDefunctBase +this.state.stk.swap + this.state.stk.sell ;
                this.state.players[this.state.stk.player].hotels[idxD] = this.state.stk.playerDefunctBase - this.state.stk.swap - this.state.stk.sell ;
                this.state.players[this.state.stk.player].hotels[idxS] = this.state.stk.playerSurvivorBase + this.state.stk.swap/2;




                this.setState({stk:this.state.stk,hotels:this.state.hotels,players:this.state.players})
                break;

            case "SellV":
                idxS = this.index(this.state.stk.survivor);
                idxD = this.index(this.state.stk.defunct);

                if (cnt < this.state.stk.sell){
                    this.state.stk.keep += (this.state.stk.sell - cnt)
                } else if (cnt > this.state.stk.sell) {
                    if(cnt <= this.state.stk.keep+this.state.stk.sell)
                        this.state.stk.keep = this.state.stk.keep +this.state.stk.sell -cnt;
                    else{
                        let t = this.state.stk.keep;

                        this.state.stk.swap = this.state.stk.total - cnt;
                        this.state.stk.keep = 0;
                        if(this.state.stk.swap % 2 == 1){
                            this.state.stk.keep  = 1;
                            this.state.stk.swap--;
                        }
                    }

                }
                this.state.stk.sell = cnt;
                this.state.players[this.state.stk.player].money = this.state.stk.playerMoneyBase + this.state.stk.sell * this.state.stk.defunctPrice;
                this.state.hotels[idxS].available = this.state.stk.hotelAvailSurvivorBase - this.state.stk.swap/2;
                this.state.hotels[idxD].available = this.state.stk.hotelAvailDefunctBase +this.state.stk.swap + this.state.stk.sell;
                this.state.players[this.state.stk.player].hotels[idxD] = this.state.stk.playerDefunctBase - this.state.stk.swap - this.state.stk.sell;
                this.state.players[this.state.stk.player].hotels[idxS] = this.state.stk.playerSurvivorBase + this.state.stk.swap/2 ;



                this.setState({stk:this.state.stk,hotels:this.state.hotels,players:this.state.players})
                break;

        }

    }



    getMessage() {

        return "Press Roll";
    }




    canClick(){
        return true
    }
    canShow(){
        return true;
    }


    getPlayerIndex(n){
        for(let i in this.state.players){
            if (this.state.players[i].name == n) {
                console.log("index="+i);
                return i;
            }
        }
        console.log("index=");
        return 0;

    }


    render() {

        return (
            <View>


                <View style={{
                    height: 2,
                    width: 3,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    layoutOrigin: [1.3, 1],
                    transform: [
                        {translateX: 0},
                        {translateZ: this.state.zorder}]
                }}>


                    <View style={{
                        height: 1,
                        width: 2,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        <AcquireBoardLayout   playerIndex={this.getPlayerIndex(this.props.name)} hotels={this.state.hotels}
                                              name ={this.props.name} invokeServer={this.invokeServer.bind(this)}
                                              invoke={this.invoke.bind(this)}
                                              buttonText ={ this.state.acquireData.buttonText}
                                              players={this.state.players} data={this.state.acquireData}/>
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            layoutOrigin: [0, 0],
                            transform: [
                                {translateX: 0},
                                {translateZ: 0}]
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                layoutOrigin: [-.06, 0],
                                transform: [
                                    {translateX: 0},
                                    {translateZ: 0}]
                            }}>
                                <AcquireHotelStats  hotels={this.state.hotels}/>
                                <AcquirePlayerStats  currentPlayer={this.props.data.currentPlayer} players={this.state.players}/>
                            </View>
                            <AcquireDialogLayout type={this.props.data.dlgType} stock={this.state.stk} buy={this.state.buy}
                                                 merger={this.state.merger} hotels={this.state.hotels}
                                                 acquireData = {this.state.acquireData}
                                                 player={this.state.players[this.getPlayerIndex(this.props.name)]}
                                                 invoke={this.invoke.bind(this)} invokeServer={this.invokeServer.bind(this)}/>
                        </View>


                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = AcquireLayout;
