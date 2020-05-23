import React,{ useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Platform, Image, } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';




const App = () => {
    const [hasPermission, setPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [selectedImage, setImage] = useState(null);
    const camera = useRef(null);
    // state = {
    //     hasPermission: null,
    //     cameraType: Camera.Constants.Type.back,
    //     selectedImage: null,
    // }

    const getPermissionAsync = async () => {
        // Camera roll Permission
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setPermission(status === 'granted');
        // this.setState({ hasPermission: status === 'granted' });
    };

    const handleCameraType=(cameraType)=>{
        // const { cameraType } = this.state

        setCameraType(cameraType === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back);
        // this.setState({cameraType:
        //         cameraType === Camera.Constants.Type.back
        //             ? Camera.Constants.Type.front
        //             : Camera.Constants.Type.back
        // })
    };

    const takePicture = async () => {
        if (camera) {
            let photo = await camera.current.takePictureAsync();
            setImage(photo.uri);
            // this.setState({selectedImage: photo.uri});
        }
    };

    useEffect(() => {
        getPermissionAsync();
    },[]);


    // async componentDidMount() {
    //     this.getPermissionAsync()
    // }




    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        setImage(result.uri);
        // this.setState({selectedImage: result.uri});
        console.log(result);
    };

    const Render = () => {
        // const { hasPermission } = this.state
        if (hasPermission === null) {
            return <View />;
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            if (selectedImage !== null) {
                return (
                    <View style={styles.container}>
                        {/*<Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />*/}
                        <Text style={styles.instructions}>
                            To share a photo from your phone with a friend, just press the button below!
                        </Text>

                        <Image
                            source={{ uri: selectedImage }}
                            style={styles.thumbnail}
                        />

                        {/*<TouchableOpacity*/}
                        {/*    onPress={()=>this.takePicture()}*/}
                        {/*    style={{ backgroundColor: 'blue' }}>*/}
                        {/*    <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                );
            }

            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={cameraType}  ref={camera}>
                        <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent'
                                }}
                                onPress={()=>pickImage()}>
                                <Ionicons
                                    name="ios-photos"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                                onPress={()=>takePicture()}
                            >
                                <FontAwesome
                                    name="camera"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                                onPress={()=>handleCameraType()}
                            >
                                <MaterialCommunityIcons
                                    name="camera-switch"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    };

    return (
        <React.Fragment>
            <Render> </Render>
        </React.Fragment>
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 20,
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    }
});

export default App;
