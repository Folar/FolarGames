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
import AcquireHotelStats from "./AcquireHotelStats";
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
                    <AcquireSubHotelLayout  hotels={this.props.hotels} players={this.props.players}/>
                    {scoreRows}
                    <AcquireTileLayout name={this.props.name} namex={"Larry"} players={this.props.players}/>
                    <View style={{
                        height: 4,
                        width: 2.8,
                        // backgroundColor:"lightblue",
                        // opacity:.5,
                        marginTop:.1,
                        marginBottom:.1,
                        layoutOrigin: [0, 0],
                        flexDirection: 'column',
                        alignItems: 'left',
                        justifyContent: 'flex-start'
                    }}>
                        <Text
                            style={{
                                width: 2.8,
                                height: .5,
                                fontSize: .13,
                                fontWeight:300,
                                textAlign: 'left',
                                marginLeft:1,
                                justifyContent: 'start',
                                color:"black"

                            }}>
                            {"log "}
                        </Text>
                    </View>
                </View>



            </View>
        )
    }
}

module.exports = AcquireBoardLayout;
