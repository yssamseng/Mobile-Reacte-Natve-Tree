import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { storage } from "../../Contexts/firebase"
import { useAuth } from "../../Contexts/AuthContext"
import { useData } from "../../Contexts/DataContext"
import firebase from "firebase";



import { Platform, StyleSheet, Button, Image, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import { LogBox } from 'react-native';
if (Platform.OS !== 'web') {
    // Ignore log notification by message:
    LogBox.ignoreLogs(['Warning: ...']);
    // Ignore all log notifications:
    LogBox.ignoreAllLogs();
}

export default function Post({ navigation }) {
    const { currentUser } = useAuth();
    const { insert, getMyPost, getAllUserPosts } = useData()
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [percentProgress, setPercentProgress] = useState(0);


    const [price, setPrice] = useState('');
    const [treeName, setTreeName] = useState('');
    const [category, setCategory] = useState('');
    const [details, setDetails] = useState('');

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const postData = async (imageUri) => {
        console.log('kkk')
        var ref = `post/${currentUser.uid}/`
        var data = {
            image: imageUri,
            price: price,
            treeName: treeName,
            category: category,
            details: details,
            timeStamp: firebase.database.ServerValue.TIMESTAMP
        }
        await insert(ref, data).then(async() => {
            await getMyPost();
            getAllUserPosts();
            console.log('ok')
        }).catch(err => {
            console.log(err)
        })
        //setUploading(false);
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            const source = { uri: result.uri };
            setImage(source);
        }
    };

    const uploadImage = async () => {
        setUploading(true);
        const { uri } = image;
        const response = await fetch(uri);
        const blob = await response.blob();
        const blobSize = blob.size;
        const childPath = `post/${currentUser.uid}/${Math.random().toString(36)}`

        const task = storage
            .ref()
            .child(childPath)
            .put(blob)
        const taskProgress = snapshot => {
            const percentProgress = snapshot.bytesTransferred * 100 / blobSize
            console.log(`transferred: ${percentProgress}`)
            setPercentProgress(percentProgress)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                console.log('ok', snapshot);
                postData(snapshot);
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted)

    };

    const handleSuccess = () => {
        alert('Post success');
        setImage(null);
        setUploading(false);
        setPrice('');
        setCategory('');
        setDetails('');
        setTreeName('');
        navigation.navigate('MyProfile')
    }


    return (
        <View>
            {/* {<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={image} style={{ width: 200, height: 200 }} />}
                <Button title="upload" onPress={uploadImage} />
            </View>} */}

            <View style={styles.container}>

                <Text style={styles.paragraph}></Text>

                {
                    image ? (
                        <View>
                            <Image source={image} style={styles.image} />
                            <TouchableOpacity
                                onPress={pickImage}
                                style={{ alignItems: 'center', backgroundColor: '#ADD8E6', margin: 10, borderRadius: 5 }}>
                                <Text style={{ fontWeight: 'bold', color: '#fff' }}> change image </Text>
                            </TouchableOpacity>
                        </View>


                    ) : (
                        <ImageBackground style={styles.image}
                            source={{ uri: 'https://www.colorhexa.com/add8e6.png' }} >
                            <TouchableOpacity style={styles.btn} onPress={pickImage}>
                                <Text style={styles.title}> choose image </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    )
                }

                {
                    uploading && (
                        <CircularProgress
                            value={100}
                            inActiveStrokeColor={'#2ecc71'}
                            inActiveStrokeOpacity={0.2}
                            textColor={'#fff'}
                            valueSuffix={'%'}
                            onAnimationComplete={() => {
                                handleSuccess()
                            }}
                        />
                    )
                }

                <Text style={styles.paragraph}></Text>

                <TextInput
                    style={{ height: 40, width: 180, padding: 5, marginBottom: 10, borderWidth: 1, }}
                    onChangeText={setPrice}
                    value={price}
                    placeholder="ราคา"
                    keyboardType="numeric"
                />

                <TextInput
                    style={{ height: 40, width: 180, padding: 5, marginBottom: 10, borderWidth: 1, }}
                    onChangeText={setTreeName}
                    value={treeName}
                    placeholder="ชื่อต้นไม้"
                />

                <TextInput
                    style={{ height: 40, width: 180, padding: 5, marginBottom: 10, borderWidth: 1, }}
                    onChangeText={setCategory}
                    value={category}
                    placeholder="หมวดหมู่"
                />

                <TextInput
                    style={{ height: 40, width: 180, padding: 5, marginBottom: 10, borderWidth: 1, }}
                    onChangeText={setDetails}
                    value={details}
                    placeholder="รายละเอียด"
                />

                <Text style={styles.paragraph}></Text>


                <View style={styles.btnBody}>
                    <TouchableOpacity style={styles.btn} onPress={uploadImage}>
                        <Text style={styles.title}> Post </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >

    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingTop: 0,
        backgroundColor: `white`,
        padding: 8,
        alignItems: 'center',
        borderRadius: 10,
    },
    paragraph: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40, width: 180, padding: 5, marginBottom: 10, borderWidth: 1
    },
    title: {
        margin: 10,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    btn: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ADD8E6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    btnBody: {
        width: 290,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 270,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
    },

});