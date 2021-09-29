import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import Post from '../Screens/Main/Post';



const Stack = createStackNavigator();
function AppStack() {
    return (
        <Stack.Navigator initialRouteName="MainHome">
            <Stack.Screen name="MainHome" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen
                name="Post"
                component={Post}
                options={{
                    title: 'Post',
                    headerStyle: {
                        backgroundColor: '#ADD8E6',
                        height: 100,
                        borderBottomStartRadius: 12,
                        borderBottomEndRadius: 12,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    )
}

export default AppStack
