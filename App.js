/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import RespondMe from './src/components/respond-me'
import DragSliders from './src/components/DragSliders'

import Draggable from './src/components/Draggable'
export default class App extends Component{
  render() {
    return (

      <View style={styles.container}>
            {/* <RespondMe /> */}
          {/* <DragSliders/> */}
          <Draggable/>
         </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#F5FCFF',
  }
});
