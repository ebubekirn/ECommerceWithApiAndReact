




import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { getProduct, updateSelectedProduct } from '../../functions/http/http';

export default function ProductUpdate() {
    const navigate=useNavigate();
    const location=useLocation();
    const[selectedProduct,setSelectedProduct]=useState({
        productName:"",
        description:"",
        unitPrice:"",
        // categoryid:"",
        // vatid:"",
        // unitid:"",
    })
    useEffect(()=>{
        getProduct(location.state.id).then((res)=>{
            setSelectedProduct(res.data)
        })
    },[])
    const onChange=(event)=>{
        setSelectedProduct({...selectedProduct,[event.target.name]:event.target.value})
    }
    const updateProduct=()=>{
        updateSelectedProduct(selectedProduct).then((res)=>{
            alert("Ürün Güncellendi")
            navigate("/products/list")
            window.location.reload()
        },err=>{
            alert(err)
        })
    }
  return (
    <div className="row">
    <div className="col-md-5">
      <label>Ürün Adı</label>
      <input className="form-control" type="text" value={selectedProduct.productName} name="productName"onChange={onChange}
      />
      <label>Fiyat</label>
      <input className="form-control" type="text"value={selectedProduct.unitPrice} name="unitPrice"onChange={onChange}
      />
      <label>Açıklama</label>
      <input className="form-control"type="text" value={selectedProduct.description} name="description" onChange={onChange}
      />
       {/* <label>Kategori</label>
      <input className="form-control"type="text" value={selectedProduct.categoryid} name="categoryid" onChange={onChange}
      />
       <label>Vergi</label>
      <input className="form-control"type="text" value={selectedProduct.vatid} name="vatid" onChange={onChange}
      />
       <label>Birim</label>
      <input className="form-control"type="text" value={selectedProduct.unitid} name="unitid" onChange={onChange}
      /> */}
      <input className="btn btn-success"  style={{marginTop: "10px"}} type="submit" value="Ürün Güncelle" onChange={onChange} onClick={() => updateProduct()}
      />
    </div>
  </div>
  )
}
