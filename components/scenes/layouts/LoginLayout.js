import React from 'react';
import {
  View,
  Animated
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
      slideLeft: new Animated.Value(-1),
      fadeIn: new Animated.Value(0),
      name:"",
      showButton: false,
      color1: "#A482DF",
      color2: "#DBDAF1",
      text: this.props.text,
      borderWidths: [0, 0, 0, 0, 0, 0]
    };
  }

  componentDidMount() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(
          this.state.slideLeft,
          {
           toValue: 0,
           duration: 2000,
           easing: Easing.ease
          }
        ),
        Animated.timing(
          this.state.fadeIn,
          {
           toValue: 1,
           duration: 2000,
           easing: Easing.ease
          }
        )
      ])
    ]).start();
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


    /*switch (input) {
      case 1:
        this.setState({borderWidths: [0.05, 0, 0, 0, 0, 0]});
        break;
      case 2:
        this.setState({borderWidths: [0, 0.05, 0, 0, 0, 0]});
        break;
      case 3:
        this.setState({borderWidths: [0, 0, 0.05, 0, 0, 0]});
        break;
      case 4:
        this.setState({borderWidths: [0, 0, 0, 0.05, 0, 0]});
        break;
      case 5:
        this.setState({borderWidths: [0, 0, 0, 0, 0.05, 0]});
        break;
      case 6:
        this.setState({borderWidths: [0, 0, 0, 0, 0, 0.05]});
        break;
    }*/
  }

  updateScene() {
    this.setState({color1: "#DBDAF1", color2: "#A482DF", text: "Watch Video"});
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
        <Animated.View
          style={{
            width: 5,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            layoutOrigin: [0, 0.5],
            opacity: this.state.fadeIn,
            transform: [
              {translateX: this.state.slideLeft},
              {translateZ: -3}
            ],
            marginTop: -0.3
          }}
        >
            <View style={{marginTop: -0.09, width: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
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
                    <Animated.Text
                        style={{
                            fontSize: 0.2,
                            textAlign: 'center',
                            color: "#000000",
                            transform: [
                                {translateX: -.3}
                            ]
                        }}>
                        {this.state.name}
                    </Animated.Text>
                </View>
                <View style={{  margin: 0.01, width:2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

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
        </Animated.View>


      </View>
    )
  }
}

module.exports = LoginLayout;
