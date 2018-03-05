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
            value:1

        };
    }

    componentDidMount() {
        switch (this.props.card.value){

            case 1:
                this.setState({backgroundColor:"#fefefe"});
                this.setState({color:"#cc46d6"});

                break;

            case 2:
                this.setState({backgroundColor:"lightblue"});
                this.setState({color:"blue"});

                break;
            case 3:
                this.setState({backgroundColor:"#59eb2c"});
                this.setState({color:"black"});

                break;
            case 5:
                this.setState({backgroundColor:"#ab2424"});
                this.setState({color:"#59eb2c"});

                break;

            case 7:
                this.setState({backgroundColor:"#ebde26"});
                this.setState({color:"#ab2424"});

                break;



        }
    }
  foo(v){


      switch (v){
          case 1:
              return "*";
          case 2:
              return "**";
          case 3:
              return "***";
          case 5:
              return "*****";
          case 7:
              return "*******";
      }
      return "***";

  }
  render() {
    return (
         <View
            style={{
              margin: .01,
              height: this.props.dim.height,
                width: this.props.dim.width,

              backgroundColor: this.state.backgroundColor,
              borderWidth: 0,
              borderColor: "#A482DF",
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
                                color: this.state.color,
                            }}>
                            {this.foo(this.props.card.value)}
                        </Text>
                    </View>
                    <View style={{ margin: 0,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Text
                            style={{
                                fontSize: this.props.dim.rankFont,
                                textAlign: 'center',
                                color: this.state.color,
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
