import axios from 'axios'

const url = "https://localhost:7134/"

export async function getProducts() {
    const response = await axios.get(url + "Products/List")
    // const response2 = await axios.get(url + "Categories/List")
    const productData = []
    try {

        for (const key in response.data) {
            const productObj = {
                id: response.data[key].id,
                description: response.data[key].description,
                productname: response.data[key].productName,
                unitprice: response.data[key].unitPrice,
                productImage: response.data[key].productImage
            }
            productData.push(productObj)
            
        }
    } catch (error) {
        console.log(error)
    }
    return productData
}

export async function addProduct(products) {
    const response = await axios.post(url + "Products/Create", products);
    const name = response.data.description;
    return name;
}

export function getProduct(id){
    return axios.get(url+`Products/GetById/${id}`)
}

export function updateSelectedProduct( product){
    return axios.put(url+`Products/Update`,product)
}

export function deleteProduct(id) {
    return axios.delete(url + `Products/Delete/${id}`)
}

export async function getCategoryName() {
    const response = await axios.get(url+"Categories/GetCategoryName")
    const dtoData = [];
    try {
        for (const key in response.data) {
            const dtoObj = {
                id: response.data[key].id,
                description: response.data[key].description
            }
            dtoData.push(dtoObj)
        }
    } catch (error) {
        console.log(error)
    }
    return dtoData
}
