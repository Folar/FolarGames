import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';


//Layout
class CardTableLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 3.8

        };

    }

    zoom() {

    }

    componentDidMount() {

    }


    render() {

        let h = .22;
        let pw = .5;


        return (
            <View
                style={{
                    opacity: 1

                }}>

                <View style={{

                    flexDirection: 'column',
                    width: 2,
                    height: 1,
                    borderRadius: 0.1,
                    backgroundColor: "green"
                }}>

                    {/*top row*/}
                    <View style={{

                        backgroundColor: "blue",
                        marginTop: .04,
                        marginLeft:0.045,
                        marginRight: .03,
                        width: 1.9,
                        height: h,
                        flexDirection: 'row',
                    }}>
                        {/*top row : player 1*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginTop: 0,
                            marginLeft: .14,
                            width: pw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                        </View>
                        {/*top row : player 2*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 0,
                            marginLeft: .06,
                            width: pw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                        </View>
                        {/*top row : player 3*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'flex_end',
                            justifyContent: 'flex-end',
                            marginTop: 0,
                            marginLeft: .06,
                            width: pw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                        </View>
                    </View>

                    {/*2nd row*/}
                    <View style={{

                        flexDirection: 'row',
                        marginTop: .01,
                        marginRight: .045,
                        marginLeft: .045,
                        width: 1.9,
                        height: h,
                        backgroundColor: "red"
                    }}>
                        <View style={{

                            flexDirection: 'column',
                            marginTop: 0,
                            marginRight: .045,
                            marginLeft: .045,
                            width: .6,
                            height: h,
                            backgroundColor: "black"
                        }}>
                        </View>
                    </View>


                    {/*third row*/}
                    <View style={{

                        flexDirection: 'row',
                        marginTop: .01,
                        marginRight: .045,
                        marginLeft: .045,
                        width: 1.9,
                        height: h,
                        backgroundColor: "red"
                    }}>
                    </View>


                    {/*fourth row*/}
                    <View style={{

                        flexDirection: 'column',
                        marginTop: .01,
                        marginRight: .045,
                        marginLeft: .045,
                        width: 1.9,
                        height: h,
                        backgroundColor: "pink"
                    }}>
                    </View>
                </View>


            </View>


        )
    }
}

module
    .exports = CardTableLayout;
