import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../../functions/http/http'
import { getCategoryName } from '../../functions/http/http'

export default function ProductCreate() {
  const navigate = useNavigate()
  const [clist, setClist] = useState([])

  useEffect(() => {
    async function getAllNames() {
      try {
        const catnames = await getCategoryName()
        setClist(catnames)
      } catch (error) {
        console.log(error)
      }
    }
    getAllNames()
  }, [])
  console.log(clist)

  const [newProduct, setNewProduct] = useState({
    productname: "",
    description: "",
    unitprice: "",
    categoryid: "",
    vatid: "",
    unitid: "",
    productimage: "",
  })
  const createProduct = () => {
    addProduct(newProduct)
      .then((res) => {
        if (res) {
          alert("Yeni ürün eklendi!")
        }
        window.location.reload()
      })
  }
  const onChange = (event) => {
    newProduct.categoryid = event.target.value
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value })
  }

  // const test = (event) => {
  //   newProduct.categoryid = event.target.value
  //   console.log(newProduct)
  // }
  
  return (
    <div className="row">
      <div className="col-md-5">
       <label>Ürün Resim</label>
        <input className="form-control" type="text" value={newProduct.productimage} name="productimage" onChange={onChange}
        />
        <label>Ürün Adı</label>
        <input className="form-control" type="text" value={newProduct.productname} name="productname" onChange={onChange}
        />
        <label>Fiyat</label>
        <input className="form-control" type="text" value={newProduct.unitprice} name="unitprice" onChange={onChange}
        />
        <label>Açıklama</label>
        <input className="form-control" type="text" value={newProduct.description} name="description" onChange={onChange}
        />
        <label>Kategori</label>
        {/* <input className="form-control"type="text" value={newProduct.categoryid} name="categoryid" onChange={onChange}
            /> */}
        <select name="cats" id="cats" onChange={onChange}>
          <option>Seçiniz</option>
          {clist.map((c) => {
            return (
              <option key={c.id} value={c.id} >{c.description}</option>
            )
          })}
        </select> <br />
        <label>Vergi</label>
        <input className="form-control" type="text" value={newProduct.vatid} name="vatid" onChange={onChange}
        />
        <label>Birim</label>
        <input className="form-control" type="text" value={newProduct.unitid} name="unitid" onChange={onChange}
        />
        <input className="btn btn-success" style={{ marginTop: "10px" }} type="submit" value="Ürün Ekle" onClick={() => createProduct()}
        />
      </div>
    </div>
  )
}
