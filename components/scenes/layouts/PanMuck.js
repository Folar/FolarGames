import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';


import PlayingCard from './elements/PlayingCard.js';


//Layout
class PanMuck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           actionState:1
        };

    }


    componentDidMount() {

    }


    reveal() {

    }

    pick() {

    }

    pass() {

    }

    render() {


        return (


                <View style={{
                    width: this.props.w,
                    height: this.props.h,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    backgroundColor: "#6b8e23",

                }}>
                    <View style={{
                        width: this.props.w/2,
                        height: this.props.h,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'

                    }}>

                        <View style={{
                         marginLeft:.02

                        }}>
                            <PlayingCard index={133} sz={.52} suit={'s'} rank={6}/>
                        </View>
                        <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            flexDirection: 'column',
                            width: .194 * .52 + .08,
                            height: .264 * .52
                        }}>
                            <View
                                style={{
                                    opacity: 1,
                                    marginLeft: 0,
                                    marginRight:.02,
                                    marginBottom:.005,
                                    flexDirection: 'row',
                                    backgroundColor: "brown",
                                    width: .194 * .52,
                                    height: .264 * .25
                                }}>


                                <VrButton onClick={this.pick(this)} key={0}>
                                    <Text
                                        style={{
                                            fontSize: .03,
                                            textAlign: 'left',
                                            marginTop: .008,
                                            marginLeft: .015,
                                            color:"black"
                                        }}>
                                        {"Pickup"}
                                    </Text>
                                </VrButton>
                            </View>
                            <View
                                style={{
                                    opacity: 1,
                                    marginLeft: 0,
                                    marginRight:.02,
                                    flexDirection: 'row',
                                    backgroundColor: "brown",
                                    width: .194 * .52,
                                    height: .264 * .25
                                }}>


                                <VrButton onClick={this.pick(this)} key={0}>
                                    <Text
                                        style={{
                                            fontSize: .03,
                                            textAlign: 'left',
                                            marginTop: .008,
                                            marginLeft: .015,
                                            color:"black"
                                        }}>
                                        {"Pass"}
                                    </Text>
                                </VrButton>
                            </View>

                        </View>
                    </View>
                    <View style={{
                        width: this.props.w/4,
                        height: this.props.h,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <Text
                            style={{
                                fontSize: .08,
                                textAlign: 'left',
                                margin: .025,
                                color:"black",
                                backgroundColor:"white"
                            }}>
                            {"96"}
                        </Text>

                    </View>

                </View>





        )
    }
}

module
    .exports = PanMuck;
