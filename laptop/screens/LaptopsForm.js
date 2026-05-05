import { View, Text, StyleSheet, Alert } from "react-native"
import { Input, Button } from "@rneui/base"
import { useState } from "react"
import { saveLaptoptRest } from "../rest_client/laptops"

export const LaptopsForm = ({ navigation }) => {
    const [marca, setMarca] = useState();
    const [procesador, setProcesador] = useState();
    const [memoria, setMemoria] = useState();
    const [disco, setDisco] = useState();

    const showMessage = () => {
        Alert.alert("CONFIRMACION", "Laptop ingresada correctamente");
    }

    const saveLaptop = () => {
        console.log("saveLaptop");
        navigation.goBack();
        saveLaptoptRest(
            {
                marca: marca,
                procesador: procesador,
                memoria: memoria,
                disco: disco
            },
            showMessage
        );
    }

    return <View style={styles.container}>
        <Input
            value={marca}
            placeholder="MARCA"
            onChangeText={(value) => {
                setMarca(value);
            }}
        />

        <Input
            value={procesador}
            placeholder="PROCESADOR"
            onChangeText={(value) => {
                setProcesador(value);
            }}
        />

        <Input
            value={memoria}
            placeholder="MEMORIA"
            onChangeText={(value) => {
                setMemoria(value);
            }}
        />

        <Input
            value={disco}
            placeholder="DISCO"
            onChangeText={(value) => {
                setDisco(value);
            }}
        />

        <Button
            title="GUARDAR"
            onPress={saveLaptop}
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