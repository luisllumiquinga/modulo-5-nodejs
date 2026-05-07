import { View, Text, StyleSheet, FlatList, TouchableHighlight } from "react-native"
import { Button, ListItem, FAB } from "@rneui/base"
import { getAllLaptops } from "../rest_client/laptops"
import { useState } from "react"

export const LaptopsList = ({ navigation }) => {
    const [laptopsList, setlaptopsList] = useState([]);

    const LaptopItem = ({ laptop }) => {
        return <TouchableHighlight onPress={() => {
            navigation.navigate("LaptopsFormNav", { laptopParam: laptop });
        }}>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{laptop.marca} {laptop.procesador}</ListItem.Title>
                    <ListItem.Subtitle>{laptop.memoria}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableHighlight>
    }

    const fnRefreshList = (laptops) => {
        setlaptopsList(laptops);
    }

    return <View style={styles.container}>
        <Text>LISTA DE LAPTOPS</Text>
        <Button
            title={"Consultar"}
            onPress={() => {
                getAllLaptops(fnRefreshList);
            }}
        />
        <FlatList
            data={laptopsList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                return <LaptopItem laptop={item} />
            }}
        />

        <FAB
            title="+"
            onPress={() => { navigation.navigate("LaptopsFormNav",{}) }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
});