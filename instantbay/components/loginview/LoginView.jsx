import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Video from 'react-native-video';


const LoginView = ({ navigation }) => {

  const [username_password, setUsername_password]=useState(['placeholderUsername', 'placeholderPassword'])

  return (
    <View style={{flex: 1}}>
      <Video
          source={require("../../assets/loginbackground.mp4")}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
        />
      <View style={styles.upperContainer}>
        <Text style={styles.title}>Welcome to InstantBay!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.buttonText}>Start Scanning</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerContainer}>

        <View style={{padding:7, width: '60%', shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,}}>
          <View style={styles.textinput}>
            <TextInput style={{width:'100%'}} placeholder='Username'/>
          </View>
        </View>
        <View style={{padding:7, width: '60%', shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,}}>
        <View style={styles.textinput}>
          <TextInput style={{width:'100%'}} placeholder='Password'/>
        </View>
        </View>
        <View style={{padding:7}}>
          <TouchableOpacity style={styles.loginbutton}>
            <Text style={styles.loginbuttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerContainer:{
    backgroundColor: '#CED4DA',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 2,
    flexDirection:'col',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    elevation: 3,
  },
  loginbutton: {
    padding: 15,
    backgroundColor: '#4361EE',
    fontSize: '30',
    borderRadius: 10,
    elevation: 3,
    // Add shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
  loginbuttonText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F5F5F7',
    marginBottom: 20,
  },
  textinput:{
    fontWeight: '600',
    backgroundColor:'#F5F5F7',
    padding: 5,
    borderRadius: 10,
    width: '100%',
    flexDirection:'row'
  },
  backgroundVideo: {
    height: '100%',
    width: '100%',
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  }
});

export default LoginView;
