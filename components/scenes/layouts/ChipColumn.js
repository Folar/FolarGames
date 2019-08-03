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
                return <Flag x={x[index]} y={y[index]} />
            return <Chip x={x[index]} y={y[index]} size={item.size} name={item.name} color={item.color}/>
        });

        return (
            <View style={{
                height: 2,
                width: 4,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                layoutOrigin: [-.13, 1.1],
                transform: [
                    {translateX: 0}]
            }}>
                {chips}

                {/*<Chip x={topX} y={.4} size={.7} name={""} color={"blue"}/>*/}
                {/*<Chip x={1.2} y={.2} size={.7} name={""} color={"blue"}/>*/}
                {/*<Flag x={.1} y={0} size={.8} name={""} color={"blue"}/>*/}
                {/*<Chip x={-1} y={-.2} size={.8} name={""} color={"cyan"}/>*/}
                {/*<Chip x={-2.1} y={-.4} size={.8} name={"Lisa"} color={"cyan"}/>*/}
                {/*<Chip x={-3.2} y={-.6} size={.8} name={"Stuart"} color={"cyan"}/>*/}
                {/*<Chip x={-4.3} y={-.8} size={.8} name={"Larry"} color={"cyan"}/>*/}
                {/*<Chip x={bottomX} y={-1} size={.5} name={"Ariz"} color={"cyan"}/>*/}





            </View>


        )
    }
}

module.exports = ChipColumn;
