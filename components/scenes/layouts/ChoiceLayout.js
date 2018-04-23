import React from 'react';
import {
    View,
    Text
} from 'react-vr';

import {Easing} from 'react-native';

;
import ChoiceGaitLayout from './ChoiceGaitLayout.js'
import ChoiceScoreLayout from './ChoiceScoreLayout.js';
import ChoiceDiceLayout from './ChoiceDiceLayout.js'
import {
    VrButton,
    asset,
    VrSoundEffects
} from 'react-vr';
let _this = null;
choiceThis = null;
//Layout
class ChoiceLayout extends React.Component {

    constructor(props) {
        super(props);
        choiceThis =this;
        this.state = {
            choiceData: {}

        };

    }

    componentDidMount() {

    }




    render() {


        let nameList = ['Larry','Stu','Bob'].map((item, index) => {
            return <Text style={{color:"black"}} key={index} >{item}</Text>
        });
        return (
            <View>


                <View style={{
                    height:2,
                    width: 5,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    layoutOrigin: [.5, .8],
                    transform: [
                        {translateX: 0},
                        {translateZ: -3}]
                }}>
                    <ChoiceDiceLayout style={{marginBottom:.2}} roll={this.props.roll} choiceShowButton ={ this.props.choiceShowButton}
                                      choiceButtonText = {this.props.choiceButtonText}  />
                    <View style={{
                        height: 1,
                        width: 5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                         <ChoiceScoreLayout choiceData={this.props.choiceData}  chooseDicePair={this.props.chooseDicePair}/>
                         <ChoiceGaitLayout choiceData={this.props.choiceData}  chooseDicePair={this.props.chooseDicePair}/>
                        <View style={{
                            height: 3,
                            width: 1,
                            marginLeft:.04,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start'
                        }}>
                            {nameList}
                        </View>

                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = ChoiceLayout;
