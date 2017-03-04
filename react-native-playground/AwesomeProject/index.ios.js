/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native'
import React, { Component } from 'react'

import SimpleModal from './app/SimpleModal'

export default class AwesomeProject extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }

  onPressButton = () => {
    this.setState({ modalVisible: true })
  }

  onCloseModal = () => {
    this.setState({ modalVisible: false })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Button onPress={this.onPressButton}
          title='Open modal'
        />
        <SimpleModal
          modalVisible={this.state.modalVisible}
          onCloseModal={this.onCloseModal}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
