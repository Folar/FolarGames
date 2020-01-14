import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;

import AcquireRowLayout from './AcquireRowLayout.js';
import AcquireHotelLayout from './AcquireHotelLayout.js';
import AcquireSubHotelLayout from './AcquireSubHotelLayout.js';
import AcquireTileLayout from './AcquireTileLayout.js';

import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';
//Layout
class AcquireBoardLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showButton: true
        }
    }

    componentDidMount() {

    }

    getValue(v){

        return 5;


    }
    getScore(row){

        return "0"
    }




    render() {

        let scoreRows =
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((item, index) => {
              return  <AcquireRowLayout style={{backgroundColor:"#0808008", opacity:1}} rank={item} value={item}  key={index} score={this.getScore(item)}/>

            });
        return (

            <View>


                <View style={{
                    margin: 0.0,
                    flexDirection: 'column',
                    height:1.85,
                    padding: 0,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'

                }}>
                    <AcquireHotelLayout/>
                    <AcquireSubHotelLayout/>
                    {scoreRows}
                    <AcquireTileLayout/>


                </View>



            </View>
        )
    }
}

module.exports = AcquireBoardLayout;
