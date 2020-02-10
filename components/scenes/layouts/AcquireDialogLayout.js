import React from 'react';
import {
    View,
    Animated,
    Text,
    asset,
    VrSoundEffects
} from 'react-vr';

//import {Easing} from 'react-native';


import AcquireChooseSurvivorLayout from './AcquireChooseSurvivorLayout.js';
import AcquireStockLayout from './AcquireStockLayout.js';
import AcquireInstruction from './AcquireInstructionLayout.js';
import AcquireBuyStockLayout from './AcquireBuyStockLayout.js';

//Layout


class AcquireDialogLayout extends React.Component {

    constructor(props) {
        super(props);



    }
    getInstr () {
        if(!this.props.acquireData.instructions )    return "";
         if(this.props.player.playing)
            return this.props.acquireData.instructions;
         return  "Welcome! Press the Start button when all the players have joined";
    }

    render() {
        const type = this.props.type;

        return (
            <View>{
                type == 3 ?(
                       <AcquireBuyStockLayout buy={this.props.buy} hotels={this.props.hotels}  player={this.props.player}
                                              invoke={this.props.invoke}  invokeServer={this.props.invokeServer}/>
                ): type == 1 ? (
                    <AcquireStockLayout stock={this.props.stock} invoke={this.props.invoke}/>
                ) : type == 2 ? (
                    <View>

                        {<AcquireChooseSurvivorLayout merger={this.props.merger} invoke={this.props.invoke}
                                                      invokeServer={this.props.invokeServer}/>}

                    </View>

               ): (

                   <View>
                       <AcquireInstruction instructions ={this.getInstr()} />
                   </View>
               )
            }

            </View>
        )
    }
}

module.exports = AcquireDialogLayout;
