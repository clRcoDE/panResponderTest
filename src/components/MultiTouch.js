import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, PanResponder, Image } from 'react-native'



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
      color: colors.red,
      disx: 0,
      disy: 0,
      scale: new Animated.Value(1),

      laststanding: 1,
      newstanding: 1,
      isFirst: null
    }
  }


  componentWillMount() {


    this.panresponder = PanResponder.create({


      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponderCapture: () => true,

      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (event, gestureState) => {


        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value })
        this.state.pan.setValue({ x: 0, y: 0 })
        this.setState({ isFirst: true })

      },
      onPanResponderMove: (event, gestureState) => {

        if (event.nativeEvent.touches.length === 2) {
          let locx1 = event.nativeEvent.changedTouches[0].locationX;
          let locx2 = event.nativeEvent.changedTouches[1].locationX;

          let locy1 = event.nativeEvent.changedTouches[0].locationY;
          let locy2 = event.nativeEvent.changedTouches[1].locationY;

          let nextdisx = Math.abs(locx1 - locx2);
          let nextdisy = Math.abs(locy1 - locy2);

          if (this.state.isFirst) {

            this.setState({ laststanding: (((nextdisx + nextdisy) / 2.000) / 100.000) })
            this.setState({ newstanding: (((nextdisx + nextdisy) / 2.000) / 100.000) })

            this.changes = this.state.newstanding - this.state.laststanding

            this.state.scale.setValue(this.state.scale._value + this.changes)
            this.setState({ isFirst: false })
          } else {




            this.setState({ newstanding: (((nextdisx + nextdisy) / 2.000) / 100.000) })


            this.changes = this.state.newstanding - this.state.laststanding



            this.state.scale.setValue(this.state.scale._value + this.changes)


            this.setState({ laststanding: this.state.newstanding })
          }

        } else {

          this.state.pan.setValue({ x: gestureState.dx, y: gestureState.dy })

        }

      },
      onPanResponderRelease: (event, gestureState) => {

        this.state.pan.flattenOffset()
        this.state.scale.flattenOffset()
      }
    })

  }
  render() {



    return (
      <View style={styles.container} >
        <Animated.Image style={[styles.box, {

          transform: [
            { translateX: this.state.pan.x },
            { translateY: this.state.pan.y },
            { scale: this.state.scale }
          ]
        }


        ]}
          source={require('../assets/images/calendar.png')}
          {...this.panresponder.panHandlers}>



        </Animated.Image>
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
  }

})
