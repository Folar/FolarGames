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
                    <ChoiceGaitRowLayout rank="0" tally="0"   chooseDicePair={this.props.chooseDicePair} choiceData={this.props.choiceData}/>
                    <ChoiceGaitRowLayout rank="1" tally="0"  chooseDicePair={this.props.chooseDicePair} choiceData={this.props.choiceData}/>
                    <ChoiceGaitRowLayout rank="2" tally="0"  chooseDicePair={this.props.chooseDicePair} choiceData={this.props.choiceData}/>

                </View>

            </View>
        )
    }
}

module.exports = ChoiceGaitLayout;
