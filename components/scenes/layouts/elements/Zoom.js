import React from 'react';
import {
    View,
    VrButton
} from 'react-vr';
import Die from "./Die";
//Element
class Zoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 0,
            backgroundColor:"white",
            color:"black"

        };
    }

    componentDidMount() {


    }

    invoke() {
            this.props.zoom(-3);
            this.setState({color:'white',
                backgroundColor:"black"});
    }
    invoke2() {
        this.props.zoom(1);
    }

    render() {
        let dieDim = {height: .2, width: .4, valueFont: .1, dieFont: .15, marginRight: .02};
        return (
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginRight: .2,
                    height: .2,
                    width: .1
                }}
            >
                <VrButton onClick={this.invoke.bind(this)} key={0}>
                    <Die value={"IPAD"} key={0} dim={dieDim} color={this.state.color}
                         backgroundColor={this.state.backgroundColor}/>
                </VrButton>
                {/*<VrButton onClick={this.invoke2.bind(this)} key={1}>*/}
                {/*    <Die value={"-"} key={1} dim={dieDim} color="black"*/}
                {/*         backgroundColor="white"/>*/}
                {/*</VrButton>*/}
            </View>
        )
    }
}

module.exports = Zoom;
