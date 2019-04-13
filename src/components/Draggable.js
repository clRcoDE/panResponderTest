import React, { Component } from 'react'
import { Text, StyleSheet, View , PanResponder , Animated ,AppRegistry } from 'react-native'

export default class Draggable extends Component {
    constructor(props){
        super(props)
        this.state={
            pan:new Animated.ValueXY(),
            scale: new Animated.Value(1)
        }
    }
    componentWillMount(){
this.damnResponder = PanResponder.create({
    oonMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant:(e , gestureState)=>{
        // Set the initial value to the current state
  this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
this.state.pan.setValue({x:0,y:0})
Animated.spring(
    this.state.scale,
    { toValue: 1.1,
         friction: 3,
         useNativeDriver:true 
        }
  ).start();
    },
    onPanResponderMove:Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},

    ]),
    onPanResponderRelease:(e,gestureState)=>{
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { 
            toValue: 1, 
            friction: 3 ,
            useNativeDriver:true
        }).start();
    }
})
    }
  render() {

      // Destructure the value of pan from the state
  let { pan , scale} = this.state;
 
  // Calculate the x and y transform from the pan value
  let [translateX, translateY] = [pan.x, pan.y];

  // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
  let boxDrag = {transform: [{translateX}, {translateY},  {scale}]};



  
    return (
      <View style={styles.container} >
       <Animated.View style={[styles.Box,boxDrag]}  {...this.damnResponder.panHandlers} ></Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',

},
Box:{
    width:100,
    height:100,
    backgroundColor:'royalblue',

}
    
})
