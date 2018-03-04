import React from 'react';
import {
  View,
  Text
} from 'react-vr';

import { Easing } from 'react-native';

;
import LetterButton from './elements/LetterButton.js';

import Button from './elements/Button.js';

//Layout
class LoginLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        name2:"Click on the keys to spell your name and then press Play",
      name:"",
      showButton: false,
      color1: "#A482DF",
      color2: "#DBDAF1",
      text: this.props.text,
      borderWidths: [0, 0, 0, 0, 0, 0]
    };
  }

  componentDidMount() {


  }

  //previously updateShowButton
  updateStage(input) {
      console.log(this)
      if (this.letter == '<-'){
          str= this.t.state.name;
          if(str.length == 1)
              this.t.setState({showButton:false});

          this.t.setState({name:str.substring(0, str.length -1)});
      } else {
          this.t.setState({name:this.t.state.name + this.letter});
          this.t.setState({showButton:true});
      }


  }

  updateScene() {
      ;
  }

  render() {
      var items = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n'].map((item,index) => {

          return <LetterButton key={index} t={this} letter={item} updateStage={this.updateStage}/>
      });
      var items2 = ['o','p','q','r','s','t','u','v','w','x','y','z','$','#'].map((item,index) => {

          return <LetterButton t={this} key={index} letter={item} updateStage={this.updateStage}/>
      });

      var items3 = ['0','1','2','3','4','5','6','7','8','9','<-'].map((item,index) => {

          return <LetterButton t={this} key={index} letter={item} updateStage={this.updateStage}/>
      });
    return (
      <View>
        <View
          style={{
            width: 3,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            layoutOrigin: [-.2, 0.3],
            opacity: this.state.fadeIn,
            transform: [
              {translateX: -3},
              {translateZ: -3}
            ],
            marginTop: -0.3
          }}
        >
            <View style={{marginTop: -0.09, width: 5, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
                <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    {items}
                </View>
                <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    {items2}
                </View>
                <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    {items3}
                </View>
                <View style={{ margin: 0.01,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                </View>

            </View>
            <View
                style={{  margin: 0.01,
                    width:5, flexDirection: 'row',
                    alignItems: 'center',justifyContent: 'flex-start',
                    layoutOrigin: [0, -.7],
                    justifyContent: 'center'}}
            >

                <Text
                    style={{
                        fontSize: 0.2,
                        height:.3,
                        textAlign: 'center',
                        color: "#000000",
                        transform: [
                            {translateX: -.3}
                        ]
                    }}>
                    {this.state.name}
                </Text>

            </View>
            <View
                style={{  margin: 0.01,
                    width:5, flexDirection: 'row',
                    alignItems: 'center',
                    layoutOrigin: [0, -1.2],
                    justifyContent: 'center'}}
            >

                <Button   updateScene={this.props.updateScene} showButton={this.state.showButton} text={this.state.text}
                          style={{
                              fontSize: 0.2,
                              textAlign: 'center',
                              color: "#000000",
                              transform: [
                                  {translateX: 0}
                              ]
                          }} />

            </View>
        </View>


      </View>
    )
  }
}

module.exports = LoginLayout;
