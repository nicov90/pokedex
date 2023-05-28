import React from 'react'
import { useSelector } from 'react-redux'
import PendingAuth from '../components/Favorites/PendingAuth';
import FavoritesList from '../components/Favorites/FavoritesList';

export default function Favorite() {
  const {auth} = useSelector((state: any) => state.account);

  return (
    <>
      {auth ?
        <FavoritesList /> : <PendingAuth />
      }
    </>
  )
}