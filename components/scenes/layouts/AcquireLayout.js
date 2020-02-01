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

        }
        ;

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

    invokeServer(cmd) {
        switch(cmd) {
            case "Start":
                this.props.sendmessage({type:"ACQ",name: this.props.name, action: 100});
                break;

        }


    }


    invoke(type,cnt){
        switch (type) {
            case "increaseHotel":
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
                break;
            case "reduceHotel":
                hotelIndex = this.index(this.state.buy.hotels[cnt]);
                pi = this.getPlayerIndex(this.props.name);
                player = this.state.players[pi];

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
                if(this.state.merger.hotels.length == 2){
                    let tempHotel = this.state.merger.hotels[0];
                    let tempColor = this.state.merger.hotelColors[0];
                    this.state.merger.hotels[0] = this.state.merger.hotels[1];
                    this.state.merger.hotelColors[0]= this.state.merger.hotelColors[1];
                    this.state.merger.hotels[1] = tempHotel;
                    this.state.merger.hotelColors[1]= tempColor;

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

                this.state.players[0].money = this.state.stk.playerMoneyBase + this.state.stk.sell * this.state.stk.defunctPrice;
                this.state.hotels[idxS].available = this.state.stk.hotelAvailSurvivorBase - this.state.stk.swap/2;
                this.state.hotels[idxD].available = this.state.stk.hotelAvailDefunctBase +this.state.stk.swap + this.state.stk.sell ;
                this.state.players[0].hotels[idxD] = this.state.stk.playerDefunctBase - this.state.stk.swap - this.state.stk.sell ;
                this.state.players[0].hotels[idxS] = this.state.stk.playerSurvivorBase + this.state.stk.swap/2;




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
                this.state.players[0].money = this.state.stk.playerMoneyBase + this.state.stk.sell * this.state.stk.defunctPrice;
                this.state.hotels[idxS].available = this.state.stk.hotelAvailSurvivorBase - this.state.stk.swap/2;
                this.state.hotels[idxD].available = this.state.stk.hotelAvailDefunctBase +this.state.stk.swap + this.state.stk.sell;
                this.state.players[0].hotels[idxD] = this.state.stk.playerDefunctBase - this.state.stk.swap - this.state.stk.sell;
                this.state.players[0].hotels[idxS] = this.state.stk.playerSurvivorBase + this.state.stk.swap/2 ;



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
