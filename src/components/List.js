/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Element from './Element';


const listData = [
    { key: '1. buy  N' },
    { key: '2. Do X ' },
    { key: '3. take this  ' },
    { key: '4. make that ' },
    { key: '5. there"s going to be todo ' },
    { key: '6. Element ' },
    { key: '7. Element ' },
    { key: '8. Element ' },
    { key: '9. Element ' },
    { key: '10. Element ' },
    { key: '11. Element ' },
    { key: '12. Element ' },
];

export default class List extends Component {
  constructor(props) {
    super(props);
    // this.renderSeparator = this.renderSeparator.bind(this);
    this.deletation = this.deletation.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      isEnabled: true,
      data: listData,
    };
  }

//   renderSeparator() {
//     return (
//       <View style={styles.separatorViewStyle}>
//         <View style={styles.separatorStyle} />
//       </View>
//     );
//   }

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
        // ItemSeparatorComponent={this.renderSeparator}
        showsVerticalScrollIndicator={false}
        renderItem={({ item ,index}) => (
          <Element
            text={item.key}
            deletation={this.deletation}
            index={index}
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