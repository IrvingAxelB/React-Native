import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Menu extends Component {
    menuItem = (item, index) => (
        <TouchableOpacity onPress={() => this.props.onItemPress(item)} key={`Menu ${item.name}`}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    render() {
        const { menuItems } = this.props;
        return (
            <View style={styles.container}>
                {menuItems.map((item) => this.menuItem(item))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Menu;
