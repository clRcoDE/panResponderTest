/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Element from './Element';


const listData = [
    { key: '1. element - swipe to delete' },
    { key: '2. element - swipe to delete' },
    { key: '3. element - swipe to delete' },
    { key: '4. element - swipe to delete' },
    { key: '5. element - swipe to delete' },
    { key: '6. element - swipe to delete' },
    { key: '7. element - swipe to delete' },
    { key: '8. element - swipe to delete' },
    { key: '9. element - swipe to delete' },
    { key: '10. element - swipe to delete' },
    { key: '11. element - swipe to delete' },
    { key: '12. element - swipe to delete' },
];

export default class List extends Component {
  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.deletation = this.deletation.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      isEnabled: true,
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

  setScrollEnabled(isEnabled) {
    this.setState({
      isEnabled,
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
            setScrollEnabled={isEnabled => this.setScrollEnabled(isEnabled)}
          />)
        }
        scrollEnabled={this.state.isEnabled}
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