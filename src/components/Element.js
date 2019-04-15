import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, PanResponder } from 'react-native';

const { width } = Dimensions.get('window');



export default class Element extends React.PureComponent {
  constructor(props) {
    super(props);

    this.gestureDelay = -25;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 25) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        } else if (gestureState.dx < -25) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + Math.abs(this.gestureDelay);
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) < width / 2) {

          Animated.timing(this.state.position, {
            toValue: { x: 0, y: 0 },
            duration: 300,
            useNativeDriver: true
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else if (gestureState.dx > width / 2) {
          Animated.timing(this.state.position, {
            toValue: { x: width, y: 0 },
            duration: 300,
            useNativeDriver: true
          }).start(() => {
            this.props.deletation(this.props.text);
            this.setScrollViewEnabled(true);
          });


        } else if (gestureState.dx < -width / 2) {
          Animated.timing(this.state.position, {
            toValue: { x: -width, y: 0 },
            duration: 300,
            useNativeDriver: true
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
        <Animated.View style={[styles.listItemWrapper, { transform: [{ translateX: this.state.position.x }] }]} {...this.panResponder.panHandlers}>
          <View style={styles.absoluteCellDelete}>
            <Text style={styles.absoluteCellDeleteText}>DELETE</Text>
          </View>
          <View style={styles.innerCell}>
            <Text style={styles.innerText} >
              {this.props.text}
            </Text>
          </View>
          <View style={styles.absoluteCellDone}>
            <Text style={styles.absoluteCellDoneText}>DONE</Text>
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
    // backgroundColor: 'red',
    // flexDirection: 'row',
    // borderWidth:3
  },
  listItemWrapper: {
    flexDirection: 'row',
    height: 100,
    marginLeft: -width,
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
    backgroundColor: '#f44'
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
    backgroundColor: '#4f4'
  },
  absoluteCellDeleteText: {
    // margin: 16,
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16
  },
  absoluteCellDoneText: {
    // margin: 16,
    color: '#555',
    fontWeight: '600',
    fontSize: 16
  },
  innerCell: {
    width: width,
    // height: 80,
    // marginLeft: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: 'rgba(0,0,0,0.1)',

  },
  innerText: {
    color: 'rgba(75, 75, 75,0.65)',
    fontSize: 18,
    fontWeight: '600',
  }
});