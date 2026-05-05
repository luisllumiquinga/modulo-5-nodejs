import { View, Text, StyleSheet, FlatList } from "react-native"
import { Button, ListItem } from "@rneui/base"
import { getAllLaptops } from "../rest_client/laptops"
import { useState } from "react"

export const LaptopsList = () => {
    const [laptopsList, setlaptopsList] = useState([]);

    const LaptopItem = ({ laptop }) => {
        return <ListItem>
            <ListItem.Content>
                <ListItem.Title>{laptop.marca} {laptop.procesador}</ListItem.Title>
                <ListItem.Subtitle>{laptop.memoria}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    }

    const fnRefreshList = (laptops) => {
        setlaptopsList(laptops);
    }

    return <View>
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
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});