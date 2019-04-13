//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, PanResponder, Animated, Dimensions, Image, Text, } from 'react-native';




const Dim = Dimensions.get('window')
// create a component
class RespondMe extends Component {


   constructor(props) {
      super(props)
      const emojis = {
         wonder: <Image source={require("../assets/images/wondered.png")} style={styles.icons} />,
         sleep: <Image source={require("../assets/images/sleep.png")} style={styles.icons} />,
         inLove: <Image source={require("../assets/images/inLove.png")} style={styles.icons} />,
         ninja: <Image source={require("../assets/images/ninja.png")} style={styles.icons} />,
         wtf: <Image source={require("../assets/images/wth.png")} style={styles.icons} />,
         tounge: <Image source={require("../assets/images/tounge.png")} style={styles.icons} />,
         tired: <Image source={require("../assets/images/bored.png")} style={styles.icons} />,
         amazed: <Image source={require("../assets/images/surprised.png")} style={styles.icons} />,
         ninja: <Image source={require("../assets/images/ninja.png")} style={styles.icons} />,
         cool: <Image source={require("../assets/images/smart.png")} style={styles.icons} />,


      }

      const position = new Animated.ValueXY()
      const object1Position = new Animated.ValueXY()
      const panResponder = PanResponder.create({
         onStartShouldSetPanResponder: (evt, gestureState) => true,
         onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
         onMoveShouldSetPanResponder: (evt, gestureState) => true,
         onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
         onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy })


            // console.warn(gesture.dx , gesture.dy)
            // if (gesture.dx < -155 && gesture.dy < -275 ) {

            //    this.setState({ currentEmoji: emojis.tounge })

            // } else if ( gesture.dx > -150 && gesture.dy > -270 ) {

            //    this.setState({ currentEmoji: emojis.wonder })

            // }else if (Math.abs(gesture.dx) < 50 && Math.abs(gesture.dy) < 50) {

            //    this.setState({ currentEmoji: emojis.sleep })

            // }


            if (Math.abs(gesture.dx) > 20 || Math.abs(gesture.dy) > 40) {
               this.setState({ currentEmoji: emojis.wonder })
            } else {
               this.setState({ currentEmoji: emojis.sleep })
            }

            if (gesture.dy < -225 && gesture.dx < -75) {
               this.setState({ currentEmoji: emojis.tired })
            }
            if (gesture.dy < -225 && gesture.dx > 75) {
               this.setState({ currentEmoji: emojis.amazed })
            }
            if (gesture.dy > 225 && gesture.dx < -75) {
               this.setState({ currentEmoji: emojis.tounge })

            }
            if (gesture.dy > 225 && gesture.dx > 75) {
               this.setState({ currentEmoji: emojis.cool })
            }


         },
         onPanResponderGrant: (evt, gestureState) => {


         },
         onPanResponderRelease: (evt, gestureState) => {

            if (Math.abs(gestureState.dx) < 20 && Math.abs(gestureState.dy) < 40) {
               this.setState({ currentEmoji: emojis.sleep })
            }


            if (gestureState.dy < - Dim.height * (35 / 100)) {
               Animated.timing(this.state.position.y, {
                  toValue: -Dim.height * (75 / 100),
                  timing: 500,
                  useNativeDriver: true
               }).start(() => {
                  position.setValue({ x: 0, y: Dim.height * (60 / 100) });
                  this.setState({ currentEmoji: emojis.ninja })
                  Animated.timing(this.state.position.y, {
                     toValue: 0,
                     timing: 1000,
                     useNativeDriver: true
                  }).start(() => { this.setState({ currentEmoji: emojis.sleep }) })
               })
            } else {
               Animated.timing(this.state.position, {
                  toValue: 0,
                  timing: 500,
                  useNativeDriver: true
               }).start(() => { this.setState({ currentEmoji: emojis.sleep }) })
            }


         }


      })


      const object1PanResponder = PanResponder.create({
         onStartShouldSetPanResponder: (evt, gestureState) => true,
         onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
         onMoveShouldSetPanResponder: (evt, gestureState) => true,
         onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
         onPanResponderMove: (event, gestureState) => {
            object1Position.setValue({ x: gestureState.dx, y: gestureState.dy })
            // console.warn("PAGEX:"+Math.round(event.nativeEvent.pageX) ,"LOCX: "+ Math.round(event.nativeEvent.locationX) ,"MOVEX :"+ Math.round(gestureState.moveX) )
         },
         onPanResponderRelease: (evt, gestureState) => {
            if (evt.nativeEvent.pageX > 175 && evt.nativeEvent.pageX < 275 && evt.nativeEvent.pageY > 225 && evt.nativeEvent.pageY < 400 && this.state.foodCount > 0) {
               this.setState({currentEmoji:emojis.tounge})
               
               Animated.parallel([
                  Animated.timing(this.state.foodVisibility, {
                     toValue: 0,
                     timing: 300,
                     useNativeDriver: true
                  }),
                  Animated.timing(this.state.foodScale, {
                     toValue: 0.5,
                     timing: 300,
                     useNativeDriver: true
                  })

               ]).start(() => {
                  this.setState({ foodCount: this.state.foodCount - 1 });
                  
                  object1Position.setValue({ x: 0, y: 0 });
this.setState({currentEmoji:emojis.sleep})
                  Animated.parallel([
                     Animated.timing(this.state.foodVisibility, {
                        toValue: 1,
                        timing: 300,
                        useNativeDriver: true
                     }),
                     Animated.spring(this.state.foodScale, {
                        toValue: 1,
                        timing: 200,
                        damping: 10,
                        useNativeDriver: true
                     })
                  ]).start()
               })



            } else {
               Animated.timing(this.state.object1Position, {
                  toValue: 0,
                  timing: 500,
                  useNativeDriver: true
               }).start()
            }
         }

      })
      this.state = {
         panResponder,
         position,
         object1PanResponder,
         object1Position,
         currentEmoji: emojis.sleep,
         foodCount: 4,
         foodVisibility: new Animated.Value(1),
         foodScale: new Animated.Value(1)

      }
   }
   lookAtFood() {

   }
   componentDidMount() {
      this.lookAtFood()
   }


   render() {
      const areas = {
         bed: <Image source={require("../assets/images/bed.png")} style={{ width: 140, height: 140 }} />,
         moon: <Image source={require("../assets/images/moon.png")} style={styles.icons} />,
         space: <Image source={require("../assets/images/saturn.png")} style={{ width: 125, height: 125 }} />,
         work: <Image source={require("../assets/images/coding.png")} style={{ width: 125, height: 125 }} />,
         sport: <Image source={require("../assets/images/rugby.png")} style={{ width: 125, height: 125 }} />
      }
      const objects = {
         sandwich: <Image source={require("../assets/images/sandwich.png")} style={{ width: 100, height: 100 }} />
      }
      let handles = this.state.panResponder.panHandlers
      let object1Handles = this.state.object1PanResponder.panHandlers
      return (
         <View style={styles.container} >
            <Animated.View style={[styles.circle, { transform: [{ translateX: this.state.position.x }, { translateY: this.state.position.y }] }]} {...handles}>

               {this.state.currentEmoji}
            </Animated.View>
            <View style={styles.bed} >{areas.bed}</View>
            <View style={styles.moon} >{areas.moon}</View>
            <View style={styles.space} >{areas.space}</View>
            <View style={styles.work} >{areas.work}</View>
            <View style={styles.sport} >{areas.sport}</View>
            <Animated.View
               style={[styles.sandwich,
               {
                  opacity: this.state.foodVisibility, transform: [{ translateX: this.state.object1Position.x },
                  { translateY: this.state.object1Position.y }, { scale: this.state.foodScale }]
               }]}
               {...object1Handles}
            >{objects.sandwich}
               <View style={styles.counterPopup} ><Text style={styles.conuterText}>{this.state.foodCount}</Text></View>
            </Animated.View>
         </View>
      );
   }
}

// define your styles
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   circle: {
      height: 100,
      width: 100,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
   },
   icons: {
      width: 100,
      height: 100,
      borderRadius: 100
   },
   bed: {
      position: 'absolute',
      zIndex: -1,

   },
   moon: {
      position: 'absolute',
      zIndex: -1,
      left: 2,
      top: 2
   },
   girl: {
      position: 'absolute',
      zIndex: -1,
      right: -30,

   },
   space: {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      right: 0
   },
   work: {
      position: 'absolute',
      zIndex: -1,
      bottom: 10,
      left: 10
   },
   sport: {
      position: 'absolute',
      zIndex: -1,
      bottom: 10,
      right: 10,
      transform: [{ rotate: "-45deg" }]
   },
   sandwich: {
      position: 'absolute',
      zIndex: 1,
      bottom: 10
   },
   counterPopup: {
      position: 'absolute',
      zIndex: 2,

      right: 0,
      top: 0,
      width: 20,
      height: 20,
      borderRadius: 20,
      backgroundColor: 'royalblue',
      justifyContent: 'center',
      alignItems: 'center',
   },
   conuterText: {
      color: '#fff'
   }
});

//make this component available to the app
export default RespondMe;