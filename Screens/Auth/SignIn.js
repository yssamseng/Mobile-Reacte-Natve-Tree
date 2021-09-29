import React, { useState, useEffect } from 'react'
import { useAuth } from '../../Contexts/AuthContext'

import { TouchableOpacity } from 'react-native';
import { Text, Button, TextInput, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import BlankSpacer from "react-native-blank-spacer";
function SignIn({ navigation }) {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (email != '' && password != '') {
            try {
                setError('')
                await login(email, password)
            } catch (e) {
                //setError('Failed to log in')
                //console.error(e)
                if (e.code == 'auth/user-not-found') {
                    setError('email does not exist')
                } else if (e.code == 'auth/wrong-password') {
                    setError('password incorrect')
                } else {
                    setError('email incorrect format')
                }
            }
        } else {
            setError('please enter your email and password')
        }

    }
    return (
        // {<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //     <Text>{email}</Text>
        //     <Text>{password}</Text>
        //     <TextInput
        //         style={{ height: 40, width: 180, padding: 5, marginBottom: 10, borderWidth: 1, }}
        //         onChangeText={setEmail}
        //         value={email}
        //         placeholder="Email"
        //     />
        //     <TextInput
        //         style={{ height: 40, width: 180, padding: 5, marginBottom: 10, borderWidth: 1, }}
        //         onChangeText={setPassword}
        //         value={password}
        //         placeholder="Password"
        //     />

        //     {
        //         error != '' ? (
        //             <Text style={{ color: 'red' }}>{error}</Text>
        //         ) : (<></>)
        //     }

        //     <View style={{ width: 120, height: 40, justifyContent: 'center', alignItems: 'center' }}>
        //         <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: '#56A3A6', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
        //             onPress={handleLogin}>
        //             <Text> login </Text>
        //         </TouchableOpacity>
        //     </View>
        //     <View style={{ width: 120, height: 40, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
        //         <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: '#56A3A6', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
        //             onPress={() => navigation.navigate('SignUp')}>
        //             <Text> SignUp </Text>
        //         </TouchableOpacity>
        //     </View>
        // </View>}

        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <Text style={{ fontWeight: 'bold' }, { fontSize: 25 }}>
                    Log
                    <Text style={{ color: 'green' }}>in</Text>
                </Text>
                <BlankSpacer height={16} />

                <Image source={{ uri: 'https://static.3dbaza.com/models/127415/be4e1afdb85f43c8a8275855.jpg' }} style={styles.image} />
                <BlankSpacer height={15} />



                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder={'Email'}
                    style={styles.input}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />

                {
                    error != '' ? (
                        <Text style={{ color: 'red' }}>{error}</Text>
                    ) : (<></>)
                }

                <Button
                    title={'Login'}
                    style={styles.input}
                    onPress={handleLogin}
                />
                <BlankSpacer height={15} />

                <Text>you <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => navigation.navigate('SignUp')}>
                    SignUp
                </Text> yet?
                </Text>

            </View>
        </SafeAreaView >
    )
}

export default SignIn

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
    image: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    hyperlinkStyle: {
        color: 'blue',
    },
});
