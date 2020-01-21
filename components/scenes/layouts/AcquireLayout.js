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
            stk:this.props.data.stk,
            merger:this.props.data.merger,
            hotels:this.props.data.hotels,
            players:this.props.data.players,
            zorder: this.props.zorder-.8,
            di:0,
            qty:0

        }
        ;

    }

    componentDidMount() {

    }

    index(str){
        return ["Luxor","Tower","American","Worldwide","Festival","Continental","Imperial"].indexOf(str);
    }


    invoke(type,cnt){
        switch (type) {
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



    setData(d){
        this.setState({bocaData:d});

    }
    canClick(){
        return true
    }
    canShow(){
        return true;
    }


    compare(a, b) {
        return (a.value - b.value) * -1;
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
                        <AcquireBoardLayout   name={this.props.name} hotels={this.state.hotels}  players={this.state.players}/>
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
                                layoutOrigin: [0, 0],
                                transform: [
                                    {translateX: 0},
                                    {translateZ: 0}]
                            }}>
                                <AcquireHotelStats  hotels={this.state.hotels}/>
                                <AcquirePlayerStats  currentIndex={this.props.data.currentIndex} players={this.state.players}/>
                            </View>
                            <AcquireDialogLayout type={this.props.data.dlgType} stock={this.state.stk}  merger={this.state.merger} invoke={this.invoke.bind(this)}/>
                        </View>


                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = AcquireLayout;
