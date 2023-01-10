import axios from "axios";

const url="https://localhost:7134/"

export async function getCategories(){
    const response=await axios.get(url+"Categories/List")
    const categoryData=[]
    try {
        for (const key in response.data) {
            const categoryObj={
                id: response.data[key].id,
                description: response.data[key].description,
            }
            categoryData.push(categoryObj)
        }
    } catch (error) {
        console.log(error)
    }
    return categoryData
}

export async function addCategory(category){
    const response=await axios.post(url+"Categories/Create",category);
    const name=response.data.description;
    return name;
}

export function getCategory(id) {
    return axios.get(url + `Categories/GetById/${id}`)
}

export function updateSelectedCategory(category) {
    return axios.put(url + `Categories/Edit`, category)
}

export function deleteCategory (id){
    return axios.delete(url + `Categories/Delete/${id}`)
}