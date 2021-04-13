import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from 'yup';
import Form from "../components/Form";
import firebase from 'firebase';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Please enter a valid email')
        .email()
        .label('Email'),
    password: Yup.string()
        .required()
        .min(6, 'Password must have at least 6 characters')
        .label('Password'),
    confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Confirmation password must match password'),
});

const RegisterScreen = ({ navigation }) => {
    const [signInError, setSignInError] = useState('');

    async function handleOnLogin(values){
        const {email, password} = values;
        setSignInError(null);
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('ScheduleScreen');
        } catch(error){
            setSignInError(error.message);
        }
    }

    async function handleonSignUp(values){
        const { name, email, password } = values;
        setSignInError(null);
        try{
            const authCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = authCredentials.user;
            await user.updateProfile({displayName: name});
            navigation.navigate('ScheduleScreen');
        } catch(error) {
            setSignInError(error.message);
        }
    }

    async function handleOnSubmit(values) {
        return values.confirm ? handleonSignUp(values) : handleOnLogin(values);
    }

    return (
        <SafeAreaView style = {styles.container}>
            <ScrollView>
                <Form
                    initialValues={{
                        email: '',
                        password: '',
                        confirm: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleOnSubmit}>
                        <Form.Field
                            name = "email"
                            leftIcon="email"
                            placeholder='enter email'
                            autoCapitalize="none"
                            keyboardType = 'email-address'
                            textContentType = 'emailAddress'/>
                        <Form.Field
                            name = 'password'
                            leftIcon = 'lock'
                            placeholder = 'enter password'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry = {true}
                            textContentType="password"/>
                        <Form.Field
                            name = "confirm"
                            leftIcon='lock'
                            placeholder="confirm password"
                            autoCapitalize='none'
                            autoCorrect= {false}
                            secureTextEntry={true}
                            textContentType="password"/>
                        <Form.Button title={values => values.confirm ? 'Register' : 'Login'}/>
                        {<Form.ErrorMessage error={signInError} visible={true}/>}
                    </Form>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccccb3',
        paddingTop: 20,
    },
});

export default RegisterScreen;