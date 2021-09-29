import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../Screens/Auth/SignIn'
import SignUp from '../Screens/Auth/SignUp'

const Stack = createStackNavigator();
function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}
export default AuthStack
