import React from 'react';
import { AuthProvider } from "./Contexts/AuthContext"
import { DataProvider } from "./Contexts/DataContext"


import Navigation from './Navigation/TabNavigator'
import Routes from './Navigation/Routes'

export default function App() {
    return (
        <AuthProvider>
            <DataProvider>
                <Routes />
            </DataProvider>
        </AuthProvider>
    );
}