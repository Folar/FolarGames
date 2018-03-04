import React from 'react';
import {
    View,
    Animated,
    Text
} from 'react-vr';

import {Easing} from 'react-native';


import TextScoreLayout from './TextScoreLayout.js';
import CardsLayout from './CardsLayout.js';

//Layout
class TakeSixLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    componentDidMount() {

    }


    render() {


        return (
            <View style={{
                marginLeft: .1,
                width: 5,
                height: 5,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }}>
                <CardsLayout text={this.props.text}/>
                <TextScoreLayout text={this.props.text}/>

            </View>
        )
    }
}

module.exports = TakeSixLayout;
