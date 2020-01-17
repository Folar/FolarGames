import React from 'react';
import {
    View,
    Animated,
    Text,
    asset,
    VrSoundEffects
} from 'react-vr';

//import {Easing} from 'react-native';


 //import AcquireChooseSurviorLayout from './AcquireChooseSurviorLayout.js';
import AcquireStockLayout from './AcquireStockLayout.js';

//Layout
var stk ={
    title:"Tower takeover or Luxor",
    survivor:"Tower",
    defunct:"Luxor",
    keep:10,
    swap:0,
    sell:0,
    total:10,
    label:"Swap",
    survivorColor:"yellow",
    defunctColor:"red",
    info:"larry wins first and second bonos for 3000 \n ydtdytkk lfyulkfuk xxxxx 7dytdjtdj tsrsy  trtrse zRgree \nify,j d ydtdjh \ndsgfhSRd hfszh hrzrdey rzey "
}

class AcquireDialogLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stk:stk,
            label:stk.label
        };



    }



    invoke(type,cnt){
        switch (type) {
            case "Swap":
            case "Sell":
                stk.label = type;
                this.setState({stk:stk})
                break;
            case "SwapV":
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
                this.setState({stk:stk})
                break;

            case "SellV":
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
                this.setState({stk:stk})
                break;

        }

    }

    render() {
        const type = this.props.type;
        console.log(this.state.label)

        return (
            <View>{
                type == 1 ? (
                    <AcquireStockLayout stock={this.state.stk} invoke={this.invoke.bind(this)}/>
                ) : type == 2 ? (
                    <View>

                        {/*<AcquireChooseSurviorLayoutr/>*/}

                    </View>

               ): (
                   <View>
                       <Text>   {""}</Text>
                   </View>
               )
            }

            </View>
        )
    }
}

module.exports = AcquireDialogLayout;
