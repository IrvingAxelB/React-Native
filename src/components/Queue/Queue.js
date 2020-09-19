import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Queue extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.isQueueWaiting()) {
            this.checkAvailableBaristas()
        }
    }

    isQueueWaiting = () => {
        const { queue } = this.props;

        return queue.find(item => item.status === 'waiting');
    }

    checkAvailableBaristas = () => {
        const { baristas } = this.props;
        const availableBarista = baristas.find(barista => {
            return barista.status === 'available';
        });
        if (availableBarista) {
            this.assignBaristaToItem(availableBarista);
            return;
        }
    }

    assignBaristaToItem = (barista) => {
        const { updateBaristaStatus, updateItemStatus, queue } = this.props;

        const itemToUpdate = queue.find(item => item.status === 'waiting');
        updateItemStatus(itemToUpdate, 'In Progress');
        updateBaristaStatus(barista, 'busy');

        setTimeout(() => {
            updateItemStatus(itemToUpdate, 'complete');
            updateBaristaStatus(barista, 'available');
        }, itemToUpdate.seconds * 1000);
    }

    render() {
        const { queue } = this.props;
        return (
            <View>
                {queue.map((item, index) => <Text key={`Queue ${index}`}>{item.name} {item.status}</Text>)}
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

export default Queue;
