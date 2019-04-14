/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Element from './Element';


const listData = [
  { key: '1. element' },
  { key: '2. element' },
  { key: '3. element' },
  { key: '4. element' },
  { key: '5. element' },
  { key: '6. element' },
];

export default class List extends Component {
  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.deletation = this.deletation.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: true,
      data: listData,
    };
  }

  renderSeparator() {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  }

  deletation(key) {
    const data = this.state.data.filter(item => item.key !== key);
    this.setState({
      data,
    });
  }

  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }


  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.state.data}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => (
          <Element
            text={item.key}
            deletation={this.deletation}
            setScrollEnabled={enable => this.setScrollEnabled(enable)}
          />)
        }
        scrollEnabled={this.state.enable}
      />
    );
  }
}

const styles = StyleSheet.create({
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#000',
  },
});