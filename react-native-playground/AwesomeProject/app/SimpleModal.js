import { Modal, Text, TouchableHighlight, View } from 'react-native'

import React from 'react'

export default class ChrisZaModal extends React.Component {
  static propTypes = {
    modalVisible: React.PropTypes.bool,
    onCloseModal: React.PropTypes.func
  }

  render () {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => { alert('Modal has been closed.') }}
      >
        <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={this.props.onCloseModal}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
        </View>
      </Modal>
    )
  }
}
