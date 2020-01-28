import React from 'react';
import {
    View,
    Text, VrButton
} from 'react-vr';
;
import ValueClickable from './elements/ValueClickable.js';





//Layout
class AcquireInstructionLayout extends React.Component {

    constructor(state) {
        super(state);

        this.state = {
        };

    }

    componentDidMount() {

    }


    render() {






        return (
            <View>


                <View style={{
                    height: 1,
                    width: 4,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'start',
                    layoutOrigin: [-.06, 1.8],
                    backgroundColor:"lightblue",
                    transform: [
                        {translateX: 0},
                        {translateZ: 0}]
                }}>



                    <View style={{
                        height: 1,
                        width: 3,
                        marginTop:.1,
                        marginBottom:.1,
                        layoutOrigin: [-0.05, 0],
                        flexDirection: 'column',
                        alignItems: 'left',
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                                width: 3,
                                height: 1,
                                fontSize: .13,
                                fontWeight:300,
                                textAlign: 'left',
                                marginLeft:1,
                                justifyContent: 'start',
                                color:"black"

                            }}>
                            {this.props.instructions}
                        </Text>
                    </View>





                </View>


            </View>


        )
    }
}

module
    .exports = AcquireInstructionLayout;
