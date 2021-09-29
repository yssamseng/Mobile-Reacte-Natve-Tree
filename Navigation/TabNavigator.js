import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { Entypo, AntDesign, MaterialCommunityIcons } from 'react-native-vector-icons'

import Home from '../Screens/Main/Home'
import MyProfile from '../Screens/Main/MyProfile'
import OtherProfile from '../Screens/Main/OtherProfile'
import ChooseImage from '../Screens/Main/Post'

import IconPlus from '../assets/icon-plus.png';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => {
    return (null);
}

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            width: 70,
            height: 70,
            //backgroundColor: '#333',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
    >
        <View>
            {children}
        </View>
    </TouchableOpacity>
)
function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    elevation: 0,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    height: 64,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 32 }}>
                            <Entypo name="home" color={color} size={32} />
                        </View>
                    )
                }}
            />
            <Tab.Screen name="PostContainer" component={EmptyScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Post")
                    }
                })}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'none', borderRadius: 30, ...styles.shadow }}>
                            <Image
                                source={IconPlus}
                                resizeMode="contain"
                                style={{
                                    width: 60,
                                    height: 60,
                                }}
                            />
                        </View>

                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )

                }}
            />
            <Tab.Screen name="MyProfile" component={MyProfile}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 34 }}>
                            <MaterialCommunityIcons name="account-circle-outline" color={color} size={34} />
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5
    }
})
export default TabNavigator
