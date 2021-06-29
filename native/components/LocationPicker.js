import React, {useState} from 'react';
import {View, Button, Text, ActivityIndicator, Alert, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
          Alert.alert(
            'Insufficient permissions!',
            'You need to grant LOCATION permissions to use this app.',
            [{ text: 'Okay' }]
          );
          return false;
        }
        return true;
      };
    const getLocationHandler = async  () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }

        try{
            setIsFetching(true);
          const location = await Location.getCurrentPositionAsync({
                timeout:5000
            })
            setPickedLocation({
                lat:location.coords.latitude,
                lng:location.coords.longitude
            });
            console.log(location)
        }catch(err){
            Alert.alert('Could not fetcg location!','Please try later',[{text:'Okay'}])
        }
        setIsFetching(false);
        
    }

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map')
    }

    return <View style={styles.locationPicker}>
        <View style={styles.mapPreview}> 
            {isFetching  ? <ActivityIndicator size='large' color={Colors.primary}/> :<Text>No location chosen yet!</Text>}
        </View>
        <View style={styles.actions}>
        <Button title='Get User Location' color={Colors.primary} onPress={getLocationHandler} />
        <Button title='Pick on Map!' color={Colors.primary} onPress={pickOnMapHandler} />
        </View>
        
    </View>
}


const styles = StyleSheet.create({
    locationPicker:{
        marginBottom:15
    },
    mapPreview:{
        marginBottom:15,
        width:'100%',
        height:150,
        borderColor:'#ccc',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    actions:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    }
})


export default LocationPicker;