import React, { useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext'

import { Text, Button, TextInput, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import BlankSpacer from "react-native-blank-spacer";

function SignUp({ navigation }) {
    const { signup } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');


    const handleSignUp = async () => {
        if (email != '' && password != '' && password === confirmPassword) {
            try {
                setError('')
                await signup(email, password)
            } catch (e) {
                if (e.code == 'auth/user-not-found') {
                    setError('email does not exist')
                } else if (e.code == 'auth/wrong-password') {
                    setError('password incorrect')
                } else {
                    setError('email incorrect format')
                }
            }
        } else if (email != '' && password != '' && password != confirmPassword) {
            setError('password not match')
        }
        else {
            setError('please enter  email password and confirmPassword')
        }

    }
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <Text style={{ fontWeight: 'bold' }, { fontSize: 25 }}> SignUp </Text>
                <BlankSpacer height={16} />

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder={'Email'}
                    style={styles.input}
                />

                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder={'Confirm Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                {
                    error != '' ? (
                        <Text style={{ color: 'red' }}>{error}</Text>
                    ) : (<></>)
                }

                <Button
                    title={'Sign up'}
                    style={styles.input}
                    onPress={handleSignUp}
                />

                <BlankSpacer height={15} />
                <Text> go to <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => navigation.navigate('SignIn')}>
                    sign in?
                </Text>
                </Text>

            </View>
        </SafeAreaView>


    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BEE1ED',
    },

    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    hyperlinkStyle: {
        color: 'blue',
    },
});
