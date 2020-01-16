import React from 'react';
import {
    View,
    Text
} from 'react-vr';


import AcquireBoardLayout from './AcquireBoardLayout.js';
import AcquireHotelStats from './AcquireHotelStats.js';
import AcquirePlayerStats from './AcquirePlayerStats.js';
import AcquireDialogLayout from './AcquireDialogLayout.js';






//Layout
class AcquireLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            choiceData: {},
            bocaData:  this.props.bocaData,

            zorder: this.props.zorder-1,
            di:0,
            qty:0

        }
        ;

    }

    componentDidMount() {

    }






    getMessage() {

        return "Press Roll";
    }



    setData(d){
        this.setState({bocaData:d});

    }
    canClick(){
        return true
    }
    canShow(){
        return true;
    }


    compare(a, b) {
        return (a.value - b.value) * -1;
    }

    render() {

        return (
            <View>


                <View style={{
                    height: 2,
                    width: 3,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    layoutOrigin: [1.3, 1],
                    transform: [
                        {translateX: 0},
                        {translateZ: this.state.zorder}]
                }}>


                    <View style={{
                        height: 1,
                        width: 2,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}>
                        <AcquireBoardLayout/>
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            layoutOrigin: [0, 0],
                            transform: [
                                {translateX: 0},
                                {translateZ: 0}]
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                layoutOrigin: [0, 0],
                                transform: [
                                    {translateX: 0},
                                    {translateZ: 0}]
                            }}>
                                <AcquireHotelStats/>
                                <AcquirePlayerStats/>
                            </View>
                            <AcquireDialogLayout type={1}/>
                        </View>


                    </View>


                </View>


            </View>
        )
    }
}

module
    .exports = AcquireLayout;
