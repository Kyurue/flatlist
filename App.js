import React, { Component } from 'react';

import {
    Text,
    Alert,
    View,
    FlatList
} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: []
        }
    }

    async componentDidMount() {
        try {
            await fetch('https://15euros.nl/api/bier_basic.php')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        content: responseJson
                    });
                });
        }
        catch {
            Alert.alert(
                'Connection Failed',
                'There is an error occured, try again later',
                [
                    { text: 'OK' }
                ]
            );
        }
    }

    flatListRenderItem = ({ item }) => {
        return (
            <View>
                <View>
                    <Text>
                        ID: {item.id}
                    </Text>
                    <Text>
                        Naam: {item.naam}
                    </Text>
                    <Text>
                        Brouwer: {item.brouwer}
                    </Text>
                    <Text>
                        Type: {item.type}
                    </Text>
                    <Text>
                        Gisting: {item.gisting}
                    </Text>
                    <Text>
                        Percentage: {item.perc}%
                    </Text>
                    <Text>
                        Inkoop Prijs: €{item.inkoop_prijs}{"\n"}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                    <View>
                        <View>
                            <FlatList
                                data={this.state.content}
                                keyExtractor={item => item.id}
                                renderItem={this.flatListRenderItem}
                            />
                        </View>
                    </View>
            </View>
        );
    }
}
