import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Menu from './src/components/Menu/Menu';
import Queue from './src/components/Queue/Queue';

class App extends Component {
  state = {
    baristas: [{ name: "Homer", status: 'available' }, { name: "Bart", status: 'available' }],
    queue: [],
    menuItems: [
      { name: 'Cafe Au Lait', seconds: 2, status: 'waiting' },
      { name: 'Cappuccino', seconds: 3, status: 'waiting' },
      { name: 'Expresso', seconds: 4, status: 'waiting' },
    ],
  };

  updateBaristaStatus = (baristaToUpdate, newStatus) => {
    const { baristas } = this.state;

    const baristaIndex = baristas.findIndex(barista => {
      return barista.name === baristaToUpdate.name;
    })

    let copyOfBaristas = [...baristas];
    let udpatedBarista = {...copyOfBaristas[baristaIndex]};
    udpatedBarista.status = newStatus;
    copyOfBaristas[baristaIndex] = udpatedBarista;

    this.setState({baristas: copyOfBaristas});
  };

  updateItemStatus = (itemToUpdate, newStatus) => {
    const { queue } = this.state;

    // TODO: Do not use the name item, instead use a unique id for queue items
    const itemIndex = queue.findIndex(item => {
      return item.name === itemToUpdate.name;
    })

    let copyOfQueue = [...queue];
    let udpatedItem = {...copyOfQueue[itemIndex]};
    udpatedItem.status = newStatus;
    copyOfQueue[itemIndex] = udpatedItem;

    this.setState({queue: copyOfQueue});
  };

  onItemPress = (item) => {
    this.setState(state => {
      const items = state.queue.concat(item);
      return {
        queue: items
      }
    })
  }

  render() {
    const { menuItems, queue, baristas } = this.state;
    return (
        <View style={styles.container}>
          <Text>Menu</Text>
          <Menu menuItems={menuItems} onItemPress={this.onItemPress} />
          <Text>Queue</Text>
          <Queue queue={queue} baristas={baristas} updateItemStatus={this.updateItemStatus} updateBaristaStatus={this.updateBaristaStatus} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
