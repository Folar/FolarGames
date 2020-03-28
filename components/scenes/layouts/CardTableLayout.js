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
        let jw =.54;
        let jh = 3;
        let mw = .69;
        let youw = 1.25;
       // let nplayers=  this.props.data.players.length;



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

                        backgroundColor: "green",
                        marginTop: .04,
                        marginLeft: 0.045,
                        marginRight: .03,
                        width: 1.9,
                        height: h,
                        flexDirection: 'row',
                    }}>
                        {/*top row : player left*/}
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
                        {/*top row : player center*/}
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
                        {/*top row : player right*/}
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
                        backgroundColor: "green"
                    }}>
                        {/*2nd row : player left*/}
                        <View style={{

                            flexDirection: 'column',
                            marginTop: 0,
                            marginRight: 0,
                            marginLeft: .045,
                            width: pw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                        </View>
                        {/*2nd row : muck*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 0,
                            marginLeft: .06,
                            width: mw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                        </View>
                        {/*2nd row : player right*/}
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


                    {/*third row*/}
                    <View style={{

                        flexDirection: 'row',
                        marginTop: .01,
                        marginRight: .045,
                        marginLeft: .045,
                        width: 1.9,
                        height: h,
                        backgroundColor: "green"
                    }}>
                        {/*3rd row : player left*/}
                        <View style={{

                            flexDirection: 'column',
                            marginTop: 0,
                            marginRight: 0,
                            marginLeft: .045,
                            width: pw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                        </View>
                        {/*3rd row : exposed hand*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 0,
                            marginLeft: .06,
                            width: mw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                        </View>
                        {/*3rd row : player right*/}
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


                    {/*fourth row*/}
                    <View style={{

                        flexDirection: 'row',
                        marginTop: .01,
                        marginRight: .045,
                        marginLeft: .045,
                        width: 1.9,
                        height: h,
                        backgroundColor: "green"
                    }}>
                        {/*4th row : journal*/}
                        <View style={{

                            flexDirection: 'column',
                            marginTop: 0,
                            marginRight: 0,
                            marginLeft: .045,
                            width: jw,
                            height: jh,
                            backgroundColor: "black"
                        }}>
                        </View>

                        {/*4th row : yourhand*/}
                        <View style={{

                            flexDirection: 'column',
                            alignItems: 'flex_end',
                            justifyContent: 'flex-end',
                            marginTop: 0,
                            marginLeft: .02,
                            width: youw,
                            height: h,
                            backgroundColor: "black"
                        }}>
                        </View>

                    </View>
                </View>


            </View>


        )
    }
}

module
    .exports = CardTableLayout;
