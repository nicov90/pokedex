import axios from 'axios';
import { UserKeyTypes, UserType, UserTypeWithId } from '../../components/Auth/types';
import Constants from 'expo-constants';

export class User {
  apiRoot: string = Constants.expoConfig?.extra?.USERSAPI_URL;

  async create(userObj: UserType){
    const {email, username} = userObj;
    const data = await this.get();
    const userExists = data.find((user: UserTypeWithId) => (
      user.email === email || user.username === username
    ))
    if(!userExists){
      const data = await axios.post(this.apiRoot, userObj)
      .then(async () => await this.get())
      .catch(err => {
        console.log(err);
        
        throw new Error("Error creating user");
      });

      return data;
    }else{
      throw new Error("User already exists");
    }
  }
  async get(): Promise<[]>{
    const data = await axios.get(this.apiRoot).then(res => res.data);
    
    return data;
  }
  async update(currentUser: UserTypeWithId, userObjectKey: UserKeyTypes){
    const {id} = currentUser;

    const userKeyToUpdate = {
      [userObjectKey]: currentUser[userObjectKey]
    }
    await axios.patch(`${this.apiRoot}/${id}`, userKeyToUpdate)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return null;
      })
  }
  async delete(){
    
  }
}