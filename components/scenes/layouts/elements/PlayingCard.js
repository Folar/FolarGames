import React from 'react';
import {
    View,
    Text,
    asset,
    Image,
    VrButton
} from 'react-vr';



//Layout
class PlayingCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            select: this.props.select ? .5:1
        };

    }

    click(e){
        if(!this.props.canClick) return;
        this.props.selector(this.props.index,this.props.group);
    }
    componentDidMount() {

    }



    render() {


        let parms = {rank:this.props.rank,suit:this.props.suit, sz: this.props.sz};


        let emptyColor =  this.props.rank == "empty" ? "black":"brown";
        let face ;
        if( this.props.rank == "empty" || this.props.rank == "emptyButton"){
            face = <View style={{

                flexDirection: 'column',
                backgroundColor:emptyColor,
                width: .194 * this.props.sz,
                height: .264 * this.props.sz

            }}/>

        } else {
            let suit = "";

            suit = this.props.rank + this.props.suit + ".jpg";
            face = <Image
                style={{
                    width: .194 * this.props.sz,
                    height: .264 * this.props.sz

                }}
                source={asset(suit)}
            >
            </Image>
        }
        return (
            <View
                style={{
                    opacity: 1,
                    width: .194*  this.props.sz

                }}>

                <View style={{

                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:"gray",
                    width: .194 * this.props.sz,
                    height: .264 * this.props.sz

                }}>

                    <VrButton onClick={this.click.bind(this)}>
                        <View style={{
                            opacity:this.props.select?.5:1,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {face}
                        </View>
                    </VrButton>
                </View>


            </View>



        )
    }
}

module
    .exports = PlayingCard;
