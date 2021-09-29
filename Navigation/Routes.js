import React, { useEffect, useState } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useAuth } from '../Contexts/AuthContext'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import TabNavigator from './TabNavigator'

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff'
    },
};
function Routes() {
    const { currentUser } = useAuth();

    return (
        <NavigationContainer theme={MyTheme}>
            {currentUser ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Routes
