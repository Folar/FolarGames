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
    survivorColor:"yellow",
    defunctColor:"red",
    info:"larry wins first and second bonos for 3000 \n ydtdytkk lfyulkfuk xxxxx 7dytdjtdj tsrsy  trtrse zRgree \nify,j d ydtdjh \ndsgfhSRd hfszh hrzrdey rzey "
}

class AcquireDialogLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dlgType:0

        };



    }





    render() {
        const type = this.props.type;
        console.log(type)

        return (
            <View>{
                type == 1 ? (
                    <AcquireStockLayout stock={stk}/>
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
