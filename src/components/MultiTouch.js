import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, PanResponder } from 'react-native'



const colors = {
  red: '#f44',
  blue: "#44f",
  green: '#4f4',
  gold: '#fd0'
}
export default class MultiTouch extends Component {


  constructor(props) {
    super(props)
    this.state = {
      pan: new Animated.ValueXY(),
      // scal: new Animated.ValueXY({x:1 , y:1}),
      color: colors.red,
      disx: 0,
      disy: 0,
      // size: {
      //   width: 200,
      //   height: 200
      // }
      scale: new Animated.Value(1)
    }
  }


  componentWillMount() {
this.locx1;
this.locx2;
this.locy1;
this.locy2;
this.nextdisx;
this.nextdisy;

    this.panresponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (event, gestureState) => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value })
        this.state.pan.setValue({ x: 0, y: 0 })
        // this.state.scale.setOffset(this.state.scale._value)
        // this.state.scale.setValue(1)

        // if (event.nativeEvent.touches.length === 2) {
        //   this.setState({ color: colors.blue })
        // } else {

        //   this.setState({ color: colors.red })
        // }

      },
      onPanResponderMove: (event, gestureState) => {
        if (event.nativeEvent.touches.length === 2) {
          // console.warn(gestureState.dx,gestureState.dy)
          // this.state.scal.setValue({x:this.state.scal.x.to+0.1, y:this.state.scal.y+0.1})
          // let newx = this.state.scal.x.interpolate({
          //   inputRange:[0,1],
          //   outputRange:[1,2]
          // })
          // let newy =  this.state.scal.y.interpolate({
          //   inputRange:[0,1],
          //   outputRange:[1,2]
          // })

          // this.state.scal.setValue({x:Math.abs(newx), y:Math.abs(newy)})

          // if(gestureState.dx>0){
          //   this.setState({size:{width:this.state.size.width+ (Math.ceil(gestureState.dx)*4), height:this.state.size.height+ (Math.ceil(gestureState.dy)*4)}})

          // }else{
          //   this.setState({size:{width:this.state.size.width- (Math.ceil(gestureState.dx)*4), height:this.state.size.height- (Math.ceil(gestureState.dy)*4)}})

          // }
          this.locx1 = Math.round(event.nativeEvent.changedTouches[0].locationX);
          this.locx2 = Math.round(event.nativeEvent.changedTouches[1].locationX);

          this.locy1 = Math.round(event.nativeEvent.changedTouches[0].locationY);
          this.locy2 = Math.round(event.nativeEvent.changedTouches[1].locationY);

          this.nextdisx = Math.abs(this.locx1 - this.locx2);
          this.nextdisy = Math.abs(this.locy1 - this.locy2);

          // let prevdis =  this.state.disx+this.state.disy 
          // let nextdis = disx+disy
          // console.warn( ,  )

          // let prevdisx = this.state.disx
          // let prevdisy = this.state.disy


          // let averagedis = ((this.nextdisx + this.nextdisy) / 2)
          let averagejoe = ((this.nextdisx + this.nextdisy) / 2) / 100.0000560000450000
          // console.warn(averagejoe, this.state.scale)
          // if (nextdisx > prevdisx && nextdisy > prevdisy) {
            // this.setState({scale:averagejoe})
            this.state.scale.setValue(averagejoe)

          // } else {
            // this.setState({scale:averagejoe})
            // this.state.scale.setValue(averagejoe)

          // }

// return Animated.event([])
          // console.warn(disx , disy)
          // if(disx>0){
          //   this.setState({size:{width:this.state.size.width+disx, height:this.state.size.height+ (Math.ceil(gestureState.dy)*4)}})
          // }

          // console.warn(Math.abs(locx1 - locx2))


          // this.state.size.setValue({ width: gestureState.dx, height: gestureState.dy })
          this.setState({ disx: this.nextdisx, disy: this.nextdisy })
        } else {
          this.state.pan.setValue({ x: gestureState.dx, y: gestureState.dy })

        }

      },
      onPanResponderRelease: (event, gestureState) => {
        this.state.pan.flattenOffset()
        this.state.scale.flattenOffset()

        // this.state.scal.flattenOffset()
      }
    })

  }
  render() {



    return (
      <View style={styles.container} >
        <Animated.View style={[styles.box, {
          // width: this.state.size.width,
          // height: this.state.size.height,
          backgroundColor: this.state.color,
          transform: [
            { translateX: this.state.pan.x },
            { translateY: this.state.pan.y },
            { scale: this.state.scale }
            // { scaleX: this.state.scal.x },
            // { scaleY: this.state.scal.y }
          ]
        }
        ]}
          {...this.panresponder.panHandlers}>



        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: '#f34'
  }

})
