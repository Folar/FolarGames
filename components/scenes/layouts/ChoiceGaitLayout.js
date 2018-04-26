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
                    <ChoiceGaitRowLayout rank="0"   chooseDicePair={this.props.chooseDicePair} choiceData={this.props.choiceData}/>
                    <ChoiceGaitRowLayout rank="1"  chooseDicePair={this.props.chooseDicePair} choiceData={this.props.choiceData}/>
                    <ChoiceGaitRowLayout rank="2"   chooseDicePair={this.props.chooseDicePair} choiceData={this.props.choiceData}/>
                    <Text
                        style={{
                            fontSize: 0.13,
                            width: 1.52,
                            height: 1,
                            textAlign: 'center',
                            color: "#000000"
                        }}>
                        {this.props.message}
                    </Text>

                </View>

            </View>
        )
    }
}

module.exports = ChoiceGaitLayout;
