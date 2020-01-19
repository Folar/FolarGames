import React from 'react';
import {
    View,
    Text
} from 'react-vr';


import AcquireBoardLayout from './AcquireBoardLayout.js';
import AcquireHotelStats from './AcquireHotelStats.js';
import AcquirePlayerStats from './AcquirePlayerStats.js';
import AcquireDialogLayout from './AcquireDialogLayout.js';




var hotels =[
    {
        name: "Luxor",
        color: "red",
        available: 15,
        size: 0,
        price: 0
    },
    {
        name: "Tower",
        color: "yellow",
        available: 22,
        size: 4,
        price: 400
    },
    {
        name: "American",
        color: "#8787ff",
        available: 25,
        size: 0,
        price: 0
    },
    {
        name: "Worldwide",
        color: "#c3af91",
        available: 25,
        size: 0,
        price: 0
    },
    {
        name: "Festival",
        color: "green",
        available: 25,
        size: 0,
        price: 0
    },
    {
        name: "Continental",
        color: "cyan",
        available: 25,
        size: 0,
        price: 0
    },
    {
        name: "Imperial",
        color: "pink",
        available: 25,
        size: 0,
        price: 0
    }




];
var players =[
    {
        name: "Larry",
        hotels:[10,3 ,0,0,0,0,0],

        money:3400
    },
    {
        name: "dino",
        hotels:[0,0 ,0,0,0,0,0],
        money:4500
    },
    {
        name: "jacob",
        hotels:[0,0 ,0,0,0,0,0],
        money:6000
    },
    {
        name: "Peter",
        hotels:[0,0 ,0,0,0,0,0],
        money:6000
    },
    {
        name: "joey",
        hotels:[0,0 ,0,0,0,0,0],
        money:4500
    },
    {
        name: "trump",
        hotels:[0,0 ,0,0,0,0,0],
        money:700
    }


];
var stk = {
    title: "Tower takeover or Luxor",
    survivor: "Tower",
    defunct: "Luxor",
    keep: 10,
    swap: 0,
    sell: 0,
    total: 10,
    survivorColor: "yellow",
    defunctColor: "red",
    defunctPrice:200,
    playerMoneyBase:6000,
    playerSurvivorBase:3,
    playerDefunctBase:10,
    hotelAvailDefunctBase:15,
    hotelAvailSurvivorBase:22,
    info:"larry wins first and second bonu s for 3000 \n ydtdytkk lfyulkfuk xxxxx 7dytdjtdj tsrsy  trtrse zRgree \nify,j d ydtdjh \ndsgfhSRd hfszh hrzrdey rzey "
}
var merger ={

    title: "Choose Survivor and order of defunct hotels",
    clickCount:0,
    sourceIndex:0,
    tempColor:"",
    info:"Choose the hotel that you want to switch",
    //info:"Select either hotel to switch the order",
    //hotels:["Festival","Continental"],
    //hotelColors:["green","cyan"],
    hotels:["Festival","Continental","Luxor","Imperial"],
    hotelColors:["green","cyan","red","pink"]
}

//Layout
class AcquireLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stk:stk,
            merger:merger,
            hotels:hotels,
            players:players,
            zorder: this.props.zorder-1,
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
                if(merger.hotels.length == 2){
                    let tempHotel = merger.hotels[0];
                    let tempColor = merger.hotelColors[0];
                    merger.hotels[0] = merger.hotels[1];
                    merger.hotelColors[0]= merger.hotelColors[1];
                    merger.hotels[1] = tempHotel;
                    merger.hotelColors[1]= tempColor;

                } else {
                    if(merger.clickCount == 0){
                        merger.clickCount = 1;
                        merger.tempColor = merger.hotelColors[cnt];
                        merger.hotelColors[cnt] ="black";
                        merger.sourceIndex =cnt;
                        merger.info = "Choose the position where you want to place "+ merger.hotels[cnt];
                    } else {
                        merger.clickCount = 0;
                        if(cnt!=merger.sourceIndex) {
                            merger.info = "Choose the hotel that you want to switch";
                            let tempHotel = merger.hotels[cnt];
                            let tempColor = merger.hotelColors[cnt];
                            merger.hotelColors[cnt] = merger.tempColor;
                            merger.hotels[cnt] = merger.hotels[merger.sourceIndex];
                            merger.hotels[merger.sourceIndex] = tempHotel;
                            merger.hotelColors[merger.sourceIndex] = tempColor;
                        }else{
                            merger.info = "Choose the hotel that you want to switch";
                            merger.hotelColors[cnt] = merger.tempColor;
                        }

                    }

                }
                this.setState({merger:merger})
                break;
            case "SwapV":
                let idxS = this.index(stk.survivor);
                let idxD = this.index(stk.defunct);
                if (cnt < stk.swap){
                    stk.keep += (stk.swap - cnt)
                } else if (cnt > stk.swap) {
                    if(cnt <= stk.keep+stk.swap)
                        stk.keep = stk.keep +stk.swap -cnt;
                    else{
                        stk.sell = stk.total - cnt ;
                        stk.keep = 0;
                    }

                }
                stk.swap = cnt;

                players[0].money = stk.playerMoneyBase + stk.sell * stk.defunctPrice;
                hotels[idxS].available = stk.hotelAvailSurvivorBase - stk.swap/2;
                hotels[idxD].available = stk.hotelAvailDefunctBase +stk.swap;
                players[0].hotels[idxD] = stk.playerDefunctBase - stk.swap;
                players[0].hotels[idxS] = stk.playerSurvivorBase + stk.swap/2;;




                this.setState({stk:stk,hotels:hotels,players:players})
                break;

            case "SellV":
                idxS = this.index(stk.survivor);
                idxD = this.index(stk.defunct);

                if (cnt < stk.sell){
                    stk.keep += (stk.sell - cnt)
                } else if (cnt > stk.sell) {
                    if(cnt <= stk.keep+stk.sell)
                        stk.keep = stk.keep +stk.sell -cnt;
                    else{
                        let t = stk.keep;

                        stk.swap = stk.total - cnt;
                        stk.keep = 0;
                        if(stk.swap % 2 == 1){
                            stk.keep  = 1;
                            stk.swap--;
                        }
                    }

                }
                stk.sell = cnt;
                players[0].money = stk.playerMoneyBase + stk.sell * stk.defunctPrice;
                hotels[idxS].available = stk.hotelAvailSurvivorBase - stk.swap/2;
                hotels[idxD].available = stk.hotelAvailDefunctBase +stk.swap + stk.sell;


                switch(stk.defunct){
                    case "Luxor":
                        players[0].luxor = stk.playerDefunctBase - stk.swap - stk.sell;
                        break;
                    case "Tower":
                        players[0].tower = stk.playerDefunctBase - stk.swap - stk.sell;
                        break;
                    case "American":
                        players[0].american = stk.playerDefunctBase - stk.swap - stk.sell;
                        break;
                    case "Worldwide":
                        players[0].worldwide = stk.playerDefunctBase - stk.swap - stk.sell;
                        break;
                    case "Festival":
                        players[0].festival = stk.playerDefunctBase - stk.swap - stk.sell;
                        break;
                    case "Continental":
                        players[0].continental = stk.playerDefunctBase - stk.swap - stk.sell;
                        break;
                    case "Imperial":
                        players[0].imperial = stk.playerDefunctBase - stk.swap - stk.sell;
                        break;
                }
                switch(stk.survivor){
                    case "Luxor":
                        players[0].luxor = stk.playerSurvivorBase + stk.swap/2;;
                        break;
                    case "Tower":
                        players[0].tower = stk.playerSurvivorBase + stk.swap/2;;
                        break;
                    case "American":
                        players[0].american = stk.playerSurvivorBase + stk.swap/2;;
                        break;
                    case "Worldwide":
                        players[0].worldwide = stk.playerSurvivorBase + stk.swap/2;;
                        break;
                    case "Festival":
                        players[0].festival = stk.playerSurvivorBase + stk.swap/2;;
                        break;
                    case "Continental":
                        players[0].continental = sstk.playerSurvivorBase + stk.swap/2;;
                        break;
                    case "Imperial":
                        players[0].imperial = stk.playerSurvivorBase + stk.swap/2;;
                        break;
                }

                this.setState({stk:stk,hotels:hotels,players:players})
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
                        <AcquireBoardLayout  hotels={hotels}  players={players}/>
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
                                <AcquireHotelStats  hotels={hotels}/>
                                <AcquirePlayerStats players={players}/>
                            </View>
                            <AcquireDialogLayout type={2} stock={this.state.stk}  merger={this.state.merger} invoke={this.invoke.bind(this)}/>
                        </View>


                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = AcquireLayout;
