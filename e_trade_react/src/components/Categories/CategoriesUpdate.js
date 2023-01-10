import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCategory, updateSelectedCategory } from '../../functions/http/httpCat';

export default function CategoriesUpdate() {
    const navigate = useNavigate();
    const location = useLocation()
    const [selectedCategory, setSelectedCategory] = useState({
        description: "",
    })

    useEffect(() => {
        getCategory(location.state.id).then((res) => {
            setSelectedCategory(res.data)
        })
    }, [])

    const onChange = (event) => {
        setSelectedCategory({ ...selectedCategory, [event.target.name]: event.target.value })
    }

    const updateCategory = () => {
        updateSelectedCategory(selectedCategory).then((res) => {
            alert("Ürün Güncellendi")
            navigate("/categories/list")
            window.location.reload()

        }, err => {
            alert(err)

        })

    }

    return (
        <div className="row">
            <div className='col-md-5'>
                <label>Kategori Adı</label>
                <input className='form-control' type="text" value={selectedCategory.description} name="description" onChange={onChange}></input>

                <input className="btn btn-success" style={{ marginTop: "10px" }} type="submit" value="Kategori Güncelle" onChange={onChange} onClick={() => updateCategory()} />
            </div>
        </div>
    )
}
