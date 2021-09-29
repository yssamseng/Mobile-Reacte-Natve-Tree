import React, { useState, useEffect } from 'react'
import { useData } from "../../Contexts/DataContext"
import { useAuth } from "../../Contexts/AuthContext";

import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, FlatList, Dimensions } from 'react-native';

import { ListItem, SearchBar } from "react-native-elements";

import IconProfile from '../../assets/icon-profile.png';

const data = [
    {
        id: "1",
        title: "ต้นแคคตัส",
    },
    {
        id: "2",
        title: "มอนสเตอร์ร่า",
    },
    {
        id: "3",
        title: "ต้นไม้ฝอกอากาศ",
    },
    {
        id: "4",
        title: "ต้นไม้หอม",
    },
    {
        id: "5",
        title: "บอนนสี",
    },
    {
        id: "6",
        title: "ดอกไม้ประดับ",
    },
    {
        id: "7",
        title: "ต้นไม้ปลอม",
    },
    {
        id: "8",
        title: "ต้นไม้เล็กๆ",
    },

];
const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};
const numColumns = 2;

function MyProfile({ navigation }) {
    const { myPost, getMyPost } = useData();
    const { currentUser } = useAuth();
    const { logout } = useAuth();

    const [isMyList, setIsMyList] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getMyPost()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const handleLogout = async () => {
        await logout()
    }


    /************Render */

    const renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <View style={styles.item}>
                <TouchableOpacity style={{ flex: 1, width: '100%', height: '100%' }}
                //onPress={}
                >
                    <View style={{ flex: 1, width: '100%', height: '100%', padding: 2 }}>
                        <Image source={{ uri: item.image }}
                            style={{
                                width: '100%',
                                height: '104%',
                            }}
                        />
                    </View>

                    <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ flex: 1, color: '#fff', padding: 8 }}>{item.treeName}</Text>
                        <Text style={{ flex: 0.4, color: '#fff', padding: 8 }}>{item.price}฿</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    };

    const showList = () => {
        return (
            <View style={{ height: '82%' }}>
                {
                    myPost.length > 0 ? (

                        <FlatList
                            data={formatData(myPost, numColumns)}
                            style={styles.container}
                            renderItem={renderItem}
                            numColumns={numColumns}
                        />

                    ) : (
                        <View>
                            <Text>ยังไม่มีรายการขาย</Text>
                        </View>
                    )
                }
            </View>
        )
    }
    /******** */

    const showListBuyed = () => {
        return (
            <View style={styles2.container}>
                <ScrollView>
                    {
                        data.map((item, index) => (
                            <View style={styles2.item}>
                                <Text>{item.title}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }

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
                                    <Text>{myPost.length}</Text>
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>กำลังติดตาม</Text>
                                    <Text>2</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                    {/**Edit */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.btnEditProfile}
                            onPress={handleLogout}
                        >
                            <Text>logout</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            {/**section Content */}
            <View style={{ paddingTop: 50, paddingLeft: 5, paddingRight: 5 }}>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={isMyList ? styles.btnListed : styles.btnUnListed}
                        onPress={() => setIsMyList(true)}
                    >
                        <Text>รายการขายของฉัน</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={!isMyList ? styles.btnListed : styles.btnUnListed}
                        onPress={() => setIsMyList(false)}
                    >
                        <Text>รายการที่ถูกสั่งซื้อ</Text>
                    </TouchableOpacity>
                </View>

                {/**Content */}
                {
                    isMyList ? (
                        <View>
                            {
                                showList()
                            }
                        </View>
                    ) : (
                        <View>
                            {
                                showListBuyed()
                            }
                        </View>
                    )
                }


            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        //backgroundColor: '#ADD8E6'
    },
    item: {
        backgroundColor: '#ADD8E6',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        height: Dimensions.get('window').width / numColumns, // approximate a square

        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
    },


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
    btnEditProfile: {
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
    },
    btnListed: {
        width: '50%',
        height: 33,
        backgroundColor: 'skyblue',
        borderBottomWidth: 3,
        borderColor: '#31A4CA',

        borderRadius: 8,

        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
    },
    btnUnListed: {
        width: '50%',
        height: 33,
        backgroundColor: '#EDEDED',
        borderBottomWidth: 1,
        borderColor: '#C0C0C0',

        borderRadius: 8,

        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
    },






})
export default MyProfile


const styles2 = StyleSheet.create({
    container: {
        marginTop: 30,
        padding: 2,
    },
    item: {
        backgroundColor: "#87CEEB",
        padding: 30,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});
