/**
 * @providesModule ClockInSwitch
 * @flow
 */
import React, {Component} from 'react';
import {View, Animated, StyleSheet, PanResponder, Text} from 'react-native';
// import {FontAwesome} from '@exponent/vector-icons';

export class ClockInSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            panValue:0
        };
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onStartShouldSetPanResponder:()=>true,
            onStartShouldSetPanResponderCapture:()=>true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({x: this.state.pan.x._value , y: this.state.pan.y._value});
                this.state.pan.setValue({x:0,y:0})
            },
            //here's where you can check, constrain and store values
            onPanResponderMove: (evt, gestureState) => {
                // 300 is the width of the red container (will leave it to you to calculate this
                // dynamically) 100 is the width of the button (90) plus the 5px margin on
                // either side of it (10px total)
            //    if(gestureState.dx < 400 - 200 && gestureState.dx> 0 ) { 
            //        newXVal =  gestureState.dx
                   
            //     }
            //     else{
            //         // newXVal = 400 - 200 
            //     }
            if( Math.floor(gestureState.moveX) < 315 && Math.floor(gestureState.moveX) > 100) {
                this.state.pan.x.setValue(gestureState.dx);
            }
                //set this state for display
                this.setState({panValue: gestureState.moveX});
            },

            onPanResponderRelease: (e, {vx, vy}) => {
                this.state.pan.flattenOffset();
                // Animated
                //     .spring(this.state.pan, {
                //     toValue: 0,
                //     duration: 400,
                //     overshootClamping: true
                // })
                //     .start();
                // this.setState({panValue: 0});
            }
        });
    }

    // componentWillUnMount() {
    //     this.state.pan.x.removeAllListeners();
    // }

    render() {
        //decouple the value from the state object
        let {pan} = this.state;
        let [translateX] = [pan.x];
        let translateStyle = {
            transform: [{
                    translateX
                },]
        };
        return (
            <View style={{flex:1,justifyContent: 'center',alignItems:'center',backgroundColor:'#444'}} >
                <Text style={styles.leftText}>Power Button Demo</Text>
                <View style={styles.buttonStyle}>
                    <Animated.View
                        style={[styles.sliderButtonStyle, translateStyle]}
                        {...this._panResponder.panHandlers}></Animated.View>
                </View>
                <Text style={styles.rightText}>{this.state.panValue}: x value</Text>
            </View>
        );
    }
}

export default ClockInSwitch;
const styles = StyleSheet.create({
    sliderButtonStyle: {
        borderColor: '#FCFFF5',
        borderStyle: 'solid',
        borderWidth: .5,
        backgroundColor: '#FCFFF5',
        borderRadius: 45,
        height: 60,
        width: 60,
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 5,
    },
    buttonStyle: {
        borderColor: '#FCFFF500',
        backgroundColor: '#DAEDE255',
        borderStyle: 'solid',
        borderWidth: 1,
        height: 100,
        width: 300,
        justifyContent: 'center',
        borderRadius: 50,
        margin: 5,
        flexDirection: 'column'
    },
    rightText: {
        justifyContent: 'center',
        textAlign: 'right',
        fontWeight: '100',
        marginHorizontal:15,
        fontSize: 20,
        color: '#FCFFF5',
        marginVertical:25,
        flexDirection: 'column'
    },
    leftText: {
        justifyContent: 'center',
        textAlign: 'left',
        fontWeight: '100',
        marginHorizontal:15,
        fontSize: 24,
        color: '#FCFFF5',
        marginVertical:25,
        flexDirection: 'column'
    }
});