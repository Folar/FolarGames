import React from 'react';
import {
  Text,
  View,
  VrButton
} from 'react-vr';

//Element
class CardButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "white",
            backgroundColor: "blue",
            boredrWidth:0,
            value:1,
            state:1

        };
    }

    componentDidMount() {


    }


  render() {


    return (
         <View
            style={{
              margin: 0.01,
              height: this.props.dim.height,
                width: this.props.dim.width,

              backgroundColor: this.props.background,
              borderWidth: this.state.borderWidth,
              borderColor: "black",
              borderStyle: "solid"
            }}
          >
            <VrButton >
                <View style={{marginTop: .05, width: this.props.dim.width, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{ margin: 0,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text
                            style={{
                                fontSize: this.props.dim.valueFont,
                                textAlign: 'center',
                                color: this.props.color,
                            }}>
                            {this.props.bulls}
                        </Text>
                    </View>
                    <View style={{ margin: 0,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text
                            style={{
                                fontSize: this.props.dim.rankFont,
                                textAlign: 'center',
                                color: this.props.color,
                            }}>
                            {this.props.card.rank}
                        </Text>
                    </View>

                </View>

            </VrButton>
          </View>
    )
  }
}

module.exports = CardButton;
