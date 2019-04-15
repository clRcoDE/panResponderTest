import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, PanResponder } from 'react-native';

const { width } = Dimensions.get('window');



export default class Element extends React.PureComponent {
  constructor(props) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        }else if( gestureState.dx < -35 ){
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + Math.abs(this.gestureDelay);
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < width/2) {

          Animated.timing(this.state.position, {
            toValue: { x: 0, y: 0 },
            duration: 300,
            useNativeDriver:true
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        }else {
          Animated.timing(this.state.position, {
            toValue: { x: width, y: 0 },
            duration: 300,
            useNativeDriver:true
          }).start(() => {
            this.props.deletation(this.props.text);
            this.setScrollViewEnabled(true);
          });
        }
      },
    });

    this.panResponder = panResponder;
    this.state = { position };
  }

  setScrollViewEnabled(isEnabled) {
    if (this.scrollViewEnabled !== isEnabled) {
      this.props.setScrollEnabled(isEnabled);
      this.scrollViewEnabled = isEnabled;
    }
  }

  render() {

    return (
      <View style={styles.listItem}>
        <Animated.View style={[{flexDirection: 'row',marginLeft:-width,transform:[{translateX:this.state.position.x}]}]} {...this.panResponder.panHandlers}>
          <View style={styles.absoluteCellDelete}>
            <Text style={styles.absoluteCellText}>DELETE</Text>
          </View>
          <View style={styles.innerCell}>
            <Text style={styles.innerText} >
              {this.props.text}
            </Text>
          </View>
          <View style={styles.absoluteCellDone}>
            <Text style={styles.absoluteCellText}>DONE</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: 100,
    // marginLeft: -100,
    justifyContent: 'center',
    backgroundColor: 'red',
    // flexDirection: 'row',

borderWidth:3
  },
  absoluteCellDelete: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    width: width,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'lime'
  },
  absoluteCellDone: {
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    width: width,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'gold'
  },
  absoluteCellText: {
    margin: 16,
    color: '#FFF',
  },
  innerCell: {
    width: width,
    height: 80,
    // marginLeft: 100,
    backgroundColor: '#55f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerText:{
    color:'#fff',
    fontSize:18,
    // fontWeight: '600',
  }
});