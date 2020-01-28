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




    render() {
        const type = this.props.type;


        return (
            <View>{
                type == 3 ?(
                       <AcquireBuyStockLayout buy={this.props.buy} hotels={this.props.hotels}  player={this.props.player}
                                              invoke={this.props.invoke}/>
                ): type == 1 ? (
                    <AcquireStockLayout stock={this.props.stock} invoke={this.props.invoke}/>
                ) : type == 2 ? (
                    <View>

                        {<AcquireChooseSurvivorLayout merger={this.props.merger} invoke={this.props.invoke} />}

                    </View>

               ): (

                   <View>
                       <AcquireInstruction instructions ={this.props.acquireData.instructions}/>
                   </View>
               )
            }

            </View>
        )
    }
}

module.exports = AcquireDialogLayout;
