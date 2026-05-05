import { View, Text, StyleSheet, Alert } from "react-native"
import { Input, Button } from "@rneui/base"
import { useState } from "react"
import { saveContactRest } from "../rest_client/contactos"

export const ContactsForm = ({navigation}) => {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const showMessage = () => {
        Alert.alert("CONFIRMACION", "Se creo el contacto");
    }

    const saveContact = () => {
        console.log("saveContact");
        navigation.goBack();
        saveContactRest(
            {
                name: name,
                surName: surname,
                phoneNumber: phoneNumber
            },
            showMessage
        );
    }

    return <View style={styles.container}>
        <Input
            value={name}
            placeholder="NOMBRE"
            onChangeText={(value) => {
                setName(value);
            }}
        />

        <Input
            value={surname}
            placeholder="APELLIDO"
            onChangeText={(value) => {
                setSurname(value);
            }}
        />

        <Input
            value={phoneNumber}
            placeholder="TELEFONO"
            onChangeText={(value) => {
                setPhoneNumber(value);
            }}
        />

        <Button
            title="GUARDAR"
            onPress={saveContact}
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