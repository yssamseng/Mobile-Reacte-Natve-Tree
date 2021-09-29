import React, { useContext, useState, useEffect } from "react"
import firebase from "firebase";
import { useAuth } from "./AuthContext";

const DataContext = React.createContext()

function useData() {
    return useContext(DataContext);
}

function DataProvider({ children }) {
    const { currentUser } = useAuth();

    const [loading, setLoading] = useState(true);
    //const [idUserAllPost, setIdUserAllPost] = useState([]);
    const [myPost, setMyPost] = useState([]);
    const [allUserPost, setAllUserPost] = useState([]);


    /************************ */
    const insert = async (ref, data) => {
        var newRefKey = firebase.database().ref(ref).push();
        var newData = {
            id: newRefKey.key,
            ...data
        }
        try {
            const result = await Promise.all([
                newRefKey.set(newData).then(() => {
                    //getLessonDB();
                })
            ])
            const finalData = Promise.all(result)
            return finalData;
        } catch (err) {
            console.log(err);
        }
    }
    const update = async (ref, data) => {
        var dataUpdate = {};
        dataUpdate[ref] = data;
        await firebase.database().ref().update(dataUpdate);
        getLessonDB();
    }

    const setFirstUserData = async () => {
        if (currentUser && !isAdmin) {
            var { uid, email } = currentUser
            var ref = '/users/userDetail/' + uid
            // console.log(currentUser)
            await firebase.database().ref(ref).once('value').then((snapshot) => {
                if (!snapshot.exists()) {
                    var updateData = { id: uid, email: email }
                    update(ref, updateData)
                }
            });
        }
    }

    /************ */
    const getMyPost = async () => {
        var { uid } = currentUser;
        var ref2 = `/post/${uid}/`;
        var newMyPost = [];
        await firebase.database().ref(ref2).orderByChild("timeStamp").once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                newMyPost = [...newMyPost, childSnapshot.val()]
            })
        });
        setMyPost(newMyPost)
        //console.log(newMyPost)
    }

    const getAllUserPosts = async () => {
        var ref2 = `/post/`;
        var idKey = [];
        await firebase.database().ref(ref2).orderByChild("timeStamp").once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                idKey = [...idKey, childSnapshot.key]
            })
        });

        var newMyPost = [];
        for (var i = 0; i < idKey.length; i++) {
            console.log('key', idKey[i])
            var ref2 = `/post/${idKey[i]}/`;
            await firebase.database().ref(ref2).once('value').then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    newMyPost = [...newMyPost, childSnapshot.val()]
                })
            });
            //console.log('...', newMyPost)
        }
        setAllUserPost(newMyPost)
        console.log('...', newMyPost)
    }



    useEffect(() => {
        getMyPost()
        getAllUserPosts()
    }, [])

    const value = {
        loading,
        myPost,
        allUserPost,

        insert,
        update,
        getMyPost,
        getAllUserPosts,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
export { useData };
export { DataProvider };