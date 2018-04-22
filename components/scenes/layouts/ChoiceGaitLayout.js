import React from 'react';
import {
    View,
    Text
} from 'react-vr';


import ChoiceGaitRowLayout from './ChoiceGaitRowLayout.js';
import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';
//Layout
class ChoiceGaitLayout extends React.Component {

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
                    margin: 0.01,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'

                }}>
                    <ChoiceGaitRowLayout rank="-" tally="0"/>
                    <ChoiceGaitRowLayout rank="-" tally="0"/>
                    <ChoiceGaitRowLayout rank="-" tally="0"/>

                </View>

            </View>
        )
    }
}

module.exports = ChoiceGaitLayout;
