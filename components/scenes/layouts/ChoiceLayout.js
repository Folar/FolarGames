import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import Die from './elements/Die.js';
import ChoiceScoreLayout from './ChoiceScoreLayout.js';
import ChoiceDiceLayout from './ChoiceDiceLayout.js'
import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';
let _this =null;
//Layout
class ChoiceLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            showButton: true

        }
    }

    componentDidMount() {

    }







    render() {





        return (
            <View>



                <View style={{
                        height: 1,
                        width: 5,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                }}>
                    <ChoiceDiceLayout/>
                    <ChoiceScoreLayout/>


                </View>


            </View>
        )
    }
}

module.exports = ChoiceLayout;
