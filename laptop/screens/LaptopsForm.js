import { View, Text, StyleSheet, Alert } from "react-native"
import { Input, Button } from "@rneui/base"
import { useState } from "react"
import { saveLaptoptRest, updateLaptoptRest, deleteLaptoptRest } from "../rest_client/laptops"

export const LaptopsForm = ({ navigation, route }) => {
    let laptopRetrieved = route.params.laptopParam;
    let isNew = true;

    if (laptopRetrieved != null) {
        isNew = false;
    }

    const [marca, setMarca] = useState(isNew ? null : laptopRetrieved.marca);
    const [procesador, setProcesador] = useState(isNew ? null : laptopRetrieved.procesador);
    const [memoria, setMemoria] = useState(isNew ? null : laptopRetrieved.memoria);
    const [disco, setDisco] = useState(isNew ? null : laptopRetrieved.disco);

    const showMessage = (message) => {
        Alert.alert("CONFIRMACION", message);
        navigation.goBack();
    }

    const createLaptop = () => {
        console.log("saveLaptop");
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

    const updateLaptop = () => {
        console.log("updateLaptop");
        updateLaptoptRest(
            {
                id: laptopRetrieved.id,
                marca: marca,
                procesador: procesador,
                memoria: memoria,
                disco: disco
            },
            showMessage
        );
    }

    const confirmDelete = () => {
        Alert.alert("CONFIRMACION", "¿Desea eliminar esta laptop?",
            [{
                text: "SI",
                onPress: deleteLaptop
            },
            {
                text: "CANCELAR"
            },]);
    }

    const deleteLaptop = () => {
        deleteLaptoptRest({
            id: laptopRetrieved.id,
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
            onPress={isNew ? createLaptop : updateLaptop}
        />

        {
            isNew ? <View></View> : <Button
                title="ELIMINAR"
                onPress={confirmDelete}
            />
        }
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