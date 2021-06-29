import * as FileSystem from 'expo-file-system'
import {insertPlace, fetchPlaces} from "../helpers/db";


export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';


export const addPlace = (title, image) => {
    return async dispatch => {

        console.log("image",image)
        const fileName = image.split('/').pop();

        const newPath = FileSystem.documentDirectory + fileName;

        try{
            await FileSystem.moveAsync({
                from:image,
                to:newPath
            })
            const resData = await insertPlace(title, newPath, 'Dummy add', 15, 18);
            console.log(resData)
            dispatch({ type: ADD_PLACE, placeData: { id:resData.insertId,title: title, image:newPath } })
        }catch(err){
            console.log(err)
            throw err;
        }
        
       
    }
};



export const loadPlaces = () => {
    return async dispatch => {

        try{
            const resData = await fetchPlaces();
            dispatch({
                type:SET_PLACES,
                places:resData.rows._array
            })
        }catch(err){
            throw err;
        }
        

    }
}