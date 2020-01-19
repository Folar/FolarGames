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

//Layout


class AcquireDialogLayout extends React.Component {

    constructor(props) {
        super(props);



    }




    render() {
        const type = this.props.type;


        return (
            <View>{
                type == 1 ? (
                    <AcquireStockLayout stock={this.props.stock} invoke={this.props.invoke}/>
                ) : type == 2 ? (
                    <View>

                        {<AcquireChooseSurvivorLayout merger={this.props.merger} invoke={this.props.invoke} />}

                    </View>

               ): (

                   <View>
                       <AcquireInstruction/>
                   </View>
               )
            }

            </View>
        )
    }
}

module.exports = AcquireDialogLayout;
