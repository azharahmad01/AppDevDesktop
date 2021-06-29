import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'


import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors  from '../constants/Colors';


const placesNavigator = createStackNavigator({
    PlacesList:PlacesListScreen,
    PlaceDetail:PlaceDetailScreen,
    NewPlace:NewPlaceScreen,
    Map:MapScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:''
        },
        headerTintColor:Colors.primary
    }
})


export default createAppContainer(placesNavigator)