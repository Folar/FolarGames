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
