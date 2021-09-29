import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import IconProfile from '../../assets/icon-profile.png';

function OtherProfile() {


    return (
        <View style={styles.body}>
            <View style={styles.headerBG}>
                <View style={styles.sectionProfile} >

                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, top: -40, right: 30, }}>
                            <Image
                                source={IconProfile}
                                resizeMode="contain"
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                            />
                        </View>

                        <View style={{ flex: 6, justifyContent: 'space-between', padding: 10 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>{'Yusuf Samseng'}</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>โพส</Text>
                                    <Text>{2}</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>กำลังติดตาม</Text>
                                    <Text>{2}</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                    {/**Edit */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.editProfile}>
                            <Text>{!true?'ติดตามแล้ว': 'ติดตาม'}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <Text>MyProfile1</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerBG: {
        height: 230,
        //padding: 40,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#ADD8E6',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
    sectionProfile: {

        padding: 20,

        height: 200,
        width: 340,

        backgroundColor: '#fff',
        top: 60,
        borderRadius: 30,

        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },
    editProfile: {
        position: 'absolute',
        width: 263,
        height: 33,

        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 28,

        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 3,
    }

})
export default OtherProfile


