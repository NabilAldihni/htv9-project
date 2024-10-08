import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Video from 'react-native-video';


const LoginView = ({ navigation }) => {

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
        <View style={{width: '100%', height: '100%', backgroundColor:'rgba(0,0,0,0.4)', position: 'absolute'}}></View>
      <View style={styles.upperContainer}>
        <Text style={styles.title}>Welcome to QuickBay!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.buttonText}>Start Scanning</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('InputItems')}
        >
          <Text style={styles.buttonText}>Input items manually</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={{color: '#1D1D1F', fontWeight: '600', alignContent: 'center', alignItems:'center', textAlign:'center', padding: 15, fontSize: 16, width: '85%' }}>
        QuickBay is an innovative mobile application designed to promote sustainability and supporting the circular economy. By allowing users to easily scan items, QuickBay helps individuals identify potential products they can sell on eBay, reducing waste and encouraging a culture of reusability.
        </Text>
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
    backgroundColor: '#DAD7CD',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 2,
    flexDirection:'col',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 15,
    padding: 14,
    backgroundColor: '#3A5A40',
    borderRadius: 10,
    elevation: 3,
  },
  loginbutton: {
    padding: 15,
    backgroundColor: '#72A276',
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
    fontWeight: '700',
    textAlign: 'center',
  },
  loginbuttonText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
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
