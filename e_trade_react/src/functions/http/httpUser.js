import axios from "axios";

const url = "https://localhost:7134/"

export async function getUsers(){
    const response = await axios.get(url+"User/UserList")
    const userData = []
    try {
        for(const key in response.data){
            const userObj= {
            id: response.data[key].id,
            mail: response.data[key].mail,
            role: response.data[key].role,
            entityname: response.data[key].entityName,
            street: response.data[key].street
            }
          userData.push(userObj)
        }
    } catch (error) {
        console.log(error)
    }
    return userData
}

export function getUser(id){
    return axios.get(url + `User/GetById/${id}`)
}

export function deleteUser(id){
    return axios.delete(url + `User/Delete/${id}`)
}

export async function addUser(users){
    const response = await axios.post(url + "Auth/Register",users)
    const name = response.data.description
    return name
}

export async function getCountyName(id){
    const response = await axios.get(url + "Auth/GetCountyName/" + id)
   const dtoData = []
   try {
    for(const key in response.data){
        const dtoObj = {
            id:response.data[key].id,
            description:response.data[key].description
        }
        dtoData.push(dtoObj)
    }
   } catch (error) {
    console.log(error)
   }
   return dtoData
}

export async function getCityName(){
    const response = await axios.get(url + "Auth/GetCityName")
   const dtoData = []
   try {
    for(const key in response.data){
        const dtoObj = {
            id:response.data[key].id,
            description:response.data[key].description
        }
        dtoData.push(dtoObj)
    }
   } catch (error) {
    console.log(error)
   }
   return dtoData
}


