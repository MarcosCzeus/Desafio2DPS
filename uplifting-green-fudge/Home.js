import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const customColors = {
    ADD_BUTTON_COLOR: '#ff6347', // Coral
};

const Home = ({ navigation }) => {
    const navigateToForm = () => {
        navigation.navigate('Form');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tareas</Text>
            <View style={styles.content}>
                <Text style={styles.emptyMessage}>No hay actividades registradas.</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={navigateToForm}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 16,
        color: 'gray',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: customColors.ADD_BUTTON_COLOR,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Home;
