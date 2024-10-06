import React from 'react'
import Video from 'react-native-video';
import video from '../../assets/loginbackground.mp4';
import { StyleSheet } from 'react-native';

const BackgroundVideo = () => {
    return (
        <Video  
            source={video}
            paused={false}
            style={styles.backgroundVideo}
            repeat={true}
        />
    );
};

const styles=StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    }
)

export default BackgroundVideo
