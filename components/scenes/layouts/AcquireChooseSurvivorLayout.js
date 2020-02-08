import React from 'react';
import {
    View,
    Text, VrButton
} from 'react-vr';
;
import ValueClickable from './elements/ValueClickable.js';





//Layout
class AcquireChooseSurvivorLayout extends React.Component {

    constructor(state) {
        super(state);

        this.state = {
        };

    }

    componentDidMount() {

    }


    canClick(){
        return false;
    }
    canShow(){
        return true;
    }

    compare(a, b) {
        return (a.value - b.value) * -1;
    }




    getDim(item) {
        return {height: .13, width: .13, valueFont: .06, dieFont: .11, marginRight: .016};
    }
    OK(){
        this.props.invokeServer('ChooseOrder',{cnt:this.props.merger.hotels.length,
                                order:this.props.merger.hotels});
    }

    invoke(idx){
        let f =   this.props.merger.hotelSizes.filter((h) => h == this.props.merger.hotelSizes[idx]);
        if(f.length == 1) return;
        this.props.invoke("switchHotels",idx);
    }

    getFG(i){

        let f =   this.props.merger.hotelSizes.filter((h) => h == this.props.merger.hotelSizes[i]);
        return f.length == 1 ?  this.props.merger.hotelColors[i]:"black";
    }
    getOpacity(i){
        return 1;
        // let f =   this.props.merger.hotelSizes.filter((h) => h == this.props.merger.hotelSizes[i]);
        // return f.length == 1 ? .25:1;
    }
    render() {
        let arrSurvivor= [];
        let len = 3/(this.props.merger.hotels.length + 1);



        let order =
            this.props.merger.hotels.map((item, index) => {
                w = index == 0? 2*len : len;

               return <VrButton onClick={this.invoke.bind(this,index)}>


                    <View style={{
                        margin: 0, flexDirection: 'row', alignItems: 'center',
                        height: .15,
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                                 width: w,
                                 height: .15,
                                fontSize: .1,
                                 fontWeight:400,
                                 textAlign: 'center',
                                 backgroundColor: this.props.merger.hotelColors[index],
                                 color:this.getFG(index)

                             }}>
                             {item}
                         </Text>
                    </View>

                </VrButton>

            });



        return (
            <View>


                <View style={{
                    height: 1,
                    width: 5,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'start',
                    layoutOrigin: [-.077, 1.8],
                    backgroundColor:"lightblue",
                    transform: [
                        {translateX: 0},
                        {translateZ: 0}]
                }}>

                    <Text
                        style={{
                            width: 5,
                            height: .15,
                            fontSize: .1,
                            fontWeight:400,
                            textAlign: 'center',
                            backgroundColor: "lightgray",
                            color:"black"

                        }}>
                        {this.props.merger.title}
                    </Text>

                    <View style={{
                        height: .3,
                        width: 5,
                        layoutOrigin: [0, 0],
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {order}
                        <View
                            style={{
                                marginLeft: 0.4,
                                paddingLeft: 0.2,
                                paddingRight: 0.2,
                                height: 0.15,
                                backgroundColor: '#A482DF',
                                borderRadius: 0.1,
                                margin: 0.01,
                                width: .7, flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <VrButton onClick={this.OK.bind(this)}>
                                <Text
                                    style={{
                                        fontSize: 0.15,
                                        textAlign: 'center',
                                        color: "#FFFFFF"
                                    }}>
                                    {"OK"}
                                </Text>
                            </VrButton>
                        </View>

                    </View>

                    <View style={{
                        height: .3,
                        width: 3,
                        marginTop:.1,
                        marginBottom:.1,
                        layoutOrigin: [-0.15, 0],
                        flexDirection: 'column',
                        alignItems: 'left',
                        justifyContent: 'center'
                    }}>
                        <Text
                            style={{
                                width: 3,
                                height: .5,
                                fontSize: .13,
                                fontWeight:300,
                                textAlign: 'left',
                                marginLeft:1,
                                justifyContent: 'start',
                                color:"black"

                            }}>
                            {this.props.merger.info}
                        </Text>
                    </View>





                </View>


            </View>


        )
    }
}

module
    .exports = AcquireChooseSurvivorLayout;
