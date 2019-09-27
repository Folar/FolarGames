import React from 'react';
import {
    Cylinder,
    Text,
    View
} from 'react-vr';
import Chip from './elements/Chip.js';
import Flag from './elements/Flag.js'
import CardButton from "./elements/CardButton";
//Element
class ChipColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "white",
            backgroundColor: "blue"

        };
    }

    componentDidMount() {


    }



    render() {
        let topX = 2.3;
        let bottomX = -5.4;
        let xAdjustments=[.3,.58,.86,1.14,1.4,1.65,1.955];
        let yAdjustments=[-.6,-1.2,-1.8,-2.4,-3,-3.6,-4.2];
        let adjx = 0;
        let adjy = 0;
        if (this.props.topX == true) {
            topX = 2.5;
            if (this.props.data.length <8) {
                adjx = xAdjustments[8 - this.props.data.length -1 ];
                adjy = yAdjustments[8 - this.props.data.length -1 ];
            }
            if(adjx!= 0)
                debugger;
        }
         if (this.props.bottomX == true) {
             bottomX = -3.1;
             topX = .15;
         }
        if (this.props.topX == false && this.props.bottomX == false )
            topX = .15;
        let  x =[topX,1.2,.1,-1,-2.1,-3.2,-4.3,bottomX];
        let  y =[.4,.2,0,-.2,-.4,-.6,-.8,-1];

        let chips = this.props.data.map((item, index) => {
            let xidx = index>7 ? -5.4 - (index -7) * 1.1 : x[index ];
            let yidx = index> 7? -1 - (index -7) *.2 : y[index ];
            if (item.type == 'F')
                return <Flag x={xidx} y={yidx} key={index} />
            console.log("n="+item.name + "  c="+item.subContents)
            return <Chip x={xidx} y={yidx} size={item.size} name={item.name} sizes={item.subContents}
                         color={item.color} key={index} textColor={item.textColor} />
        });

        return (
            <View style={{
                height: 2,
                width: 4,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                layoutOrigin: [1.2 + adjx, 1.1 +adjy],
                transform: [
                    {translateX: 0}]
            }}>
                {chips}

            </View>


        )
    }
}

module.exports = ChipColumn;
