import React from 'react';
import {
    View,
    Animated,
    Text,
    asset,
    VrSoundEffects
} from 'react-vr';



import TextScoreLayout from './TextScoreLayout.js';
import CardsLayout from './CardsLayout.js';

//Layout
takeSixThis = null;
class TakeSixLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };

        takeSixThis = this;

    }

    componentDidMount(){
    }

    render() {
        return (
            <View style={{
                layoutOrigin: [0, 0],

                marginLeft: .1,
                width: 5,
                height: 1.4,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }}>
                <CardsLayout text={this.props.text} data={this.state.data}  state={this.state.data.state}
                             pickCard={this.props.pickCard}/>
                <TextScoreLayout text={this.props.text}  showButton={this.state.showButton} data={this.state.data}
                                 playAgain={this.props.playAgain}
                                 clickButton={this.props.clickButton} name ={this.props.name} admin={this.props.admin}
                                 fakeadmin={this.props.fakeadmin} playMoo={this.props.playMoo}  />

            </View>
        )
    }
}

module.exports = TakeSixLayout;
