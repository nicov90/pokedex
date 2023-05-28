import { ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { setCurrentUser } from '../../redux/slices/currentUser';
import { currentPokemonType } from '../../redux/slices/pokemon';
import { User } from '../../api/users';

export default function FavoritesManager() {
  const userApi = new User();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: any) => state.account);
  const { currentUser } = useSelector((state: any) => state.currentUser);
  const { currentPokemonId }: currentPokemonType = useSelector((state: any)=> state.pokemon);
  const { favorites }: {favorites: string[]} = currentUser;
  const stringId = currentPokemonId.toString();
  const isFavorite = favorites.includes(stringId);

  const handleFavoriteBtn = () => {
    if(auth){
      if(isFavorite){
        const newFavoriteArray = favorites.filter(id => id !== stringId);
        setFavorite(newFavoriteArray);
        ToastAndroid.show("Removed from favorites", ToastAndroid.LONG);
      }else{
        const newFavoriteArray = [...favorites, stringId];
        setFavorite(newFavoriteArray);
        ToastAndroid.show("Added to favorites", ToastAndroid.LONG);
      }
    }else{
      ToastAndroid.show("You need to log in to use this feature", ToastAndroid.LONG);
    }
  }

  const setFavorite = (newFavoriteArray: string[]) => {
    dispatch(setCurrentUser({...currentUser, favorites: newFavoriteArray}));
  }

  useEffect(()=>{
    const updateUser = async () => {
      await userApi.update(currentUser, "favorites");
    };
    updateUser();
  },[currentUser]);

  return (
    <Icon 
      name='heart'
      size={20}
      solid={isFavorite}
      style={{padding: 10, transform: [{translateY: 2}]}}
      onPress={handleFavoriteBtn}
    />
  )
}