import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";
import { useData } from "../../Contexts/DataContext"


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
export default function Home({ navigation }) {
    const { allUserPost, getAllUserPosts } = useData();

    const [search, setSearch] = useState();
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllUserPosts()
            setFilterData(allUserPost);
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    // useEffect(() => {
    //     getAllUserPosts();
    //     setFilterData(allUserPost);
    // }, [])


    const handleSearch = (text) => {
        if (text) {
            const newData = allUserPost.filter((item) => {
                const itemData = item.treeName ? item.treeName.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilterData(newData);
        } else {
            setFilterData(allUserPost);
        }
        setSearch(text);
    };


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


    return (
        <View style={{ flex: 1, backgroundColor: '#ADD8E6', padding: 10, paddingTop: 50 }}>
            <View style={{ height: 100, backgroundColor: '#ADD8E6', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#fff' }}>Tree{search}</Text>
                <SearchBar
                    placeholder="Search Here..."
                    lightTheme
                    round
                    value={search}
                    onChangeText={(value) => handleSearch(value)}
                    autoCorrect={false}
                    clearButtonMode='always'
                />
            </View>
            <View style={{ width: '100%', height: '84.2%' }}>
                <FlatList
                    data={formatData(allUserPost, numColumns)}
                    style={styles.container}
                    renderItem={renderItem}
                    numColumns={numColumns}
                />
            </View>

        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
    },
});