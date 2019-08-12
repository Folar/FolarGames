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
        if (this.props.topX == true)
            topX = 2.5;
         if (this.props.bottomX == true) {
             bottomX = -3.1;
             topX = .15;
         }
        if (this.props.topX == false && this.props.bottomX == false )
            topX = .15;
        let  x =[topX,1.2,.1,-1,-2.1,-3.2,-4.3,bottomX];
        let  y =[.4,.2,0,-.2,-.4,-.6,-.8,-1];
        let chips = this.props.data.map((item, index) => {

            if (item.type == 'F')
                return <Flag x={x[index]} y={y[index]} key={index} />
            console.log("n="+item.name + "  c="+item.subContents)
            return <Chip x={x[index]} y={y[index]} size={item.size} name={item.name} sizes={item.subContents}
                         color={item.color} key={index} textColor={item.textColor} />
        });

        return (
            <View style={{
                height: 2,
                width: 4,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                layoutOrigin: [1.2, 1.1],
                transform: [
                    {translateX: 0}]
            }}>
                {chips}

            </View>


        )
    }
}

module.exports = ChipColumn;
