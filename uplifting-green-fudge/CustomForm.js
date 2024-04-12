import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";

const customColors = {
    PRIMARY_COLOR: '#ff6347', // Coral
};

const CustomForm = ({ activities, setActivities, toggleFormDisplay }) => {
    const navigation = useNavigation();
    const [taskName, setTaskName] = useState('');
    const [subject, setSubject] = useState('');
    const [team, setTeam] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmDate = date => {
        const options = { year: 'numeric', month: 'long', day: "2-digit" };
        setDueDate(date.toLocaleDateString('es-ES', options));
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmTime = time => {
        const options = { hour: 'numeric', minute: '2-digit', hour12: false };
        setDueTime(time.toLocaleString('es-ES', options));
        hideTimePicker();
    };

    const createNewTask = () => {
        if (
            taskName.trim() === '' ||
            subject.trim() === '' ||
            team.trim() === '' ||
            dueDate.trim() === '' ||
            dueTime.trim() === ''
        ) {
            showAlert();
            return;
        }

        const task = { taskName, subject, team, dueDate, dueTime };
        task.id = shortid();

        const newActivities = [...activities, task];
        setActivities(newActivities);
        toggleFormDisplay(false);
        setTaskName('');
        setSubject('');
        setTeam('');
        setDueDate('');
        setDueTime('');

        navigation.navigate('Activities');
    };

    const showAlert = () => {
        Alert.alert(
            'Error',
            'Por favor llena todos los campos, son necesarios',
            [{
                text: 'OK'
            }]
        )
    };

    return (
        <>
            <ScrollView style={styles.form}>
                <View>
                    <Text style={styles.label}>Nombre de la tarea:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTaskName(text)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Asignatura:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setSubject(text)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Equipo de Trabajo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTeam(text)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha de Entrega:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmDate}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS="Elige la fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{dueDate}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora de Entrega:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmTime}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        headerTextIOS="Elige una Hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{dueTime}</Text>
                </View>
                <View>
                    <TouchableHighlight onPress={() => createNewTask()} style={styles.btnSubmit}>
                        <Text style={styles.submitText}>Crear Nueva Tarea</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: customColors.PRIMARY_COLOR,
        marginVertical: 10
    },
    submitText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default CustomForm;
