import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addUser, getCityName, getCountyName } from '../../functions/http/httpUser'

export default function Registration() {
    const navigate = useNavigate()
    const [countyList, setCountyList] = useState([])
    const [cityList, setCityList] = useState([])
    const [selectedCityId, setSelectedCityId] = useState(0)

    useEffect(() => {
        async function getAllCityNames() {
            try {
                // const id = document.getElementById("cityId").target.value
                // const countyNames = await getCountyName(selectedCityId)
                const cityNames = await getCityName()
                // setCountyList(countyNames)
                setCityList(cityNames)

            } catch (error) {
                console.log(error)
            }
        }
        getAllCityNames()
    }, [])

    useEffect(() => {
        async function getAllCountyNames() {
            // alert(selectedCityId)
            try {
                const countyNames = await getCountyName(selectedCityId)
                setCountyList(countyNames)

            } catch (error) {
                console.log(error)
            }
        }
        getAllCountyNames()
    }, [selectedCityId])

    console.log(countyList)

    const [newUser, setNewUser] = useState({
        mail: "",
        password: "",
        entityName: "",
        street: "",
        avenue: "",
        no: "",
        countyId: "",
        // cityId: ""
    })

    const createUser = () => {
        addUser(newUser)
            .then((res) => {
                if (res) {
                    alert("Kullanıcı Kayıt Başarılı")
                }
                navigate("/User/UsersList")
            })
    }

    const onChange = (event) => {
        newUser.countyId = event.target.value
        setNewUser({ ...newUser, [event.target.name]: event.target.value })
    }

    const onChange2 = (event) => {
       var x = event.target.value
       var y = event.target.text
       if(y == "Seçiniz"){
        setSelectedCityId(0)
       } else {
       setSelectedCityId(x)
       }
        // alert(selectedCityId)
    }

    return (
        <div className="vh-100" style={{ backgroundColor: "#eee" }} >
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }} >
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Üye Ol</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={onChange} value={newUser.entityName} type="text" name='entityName' className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example1c">Ad Soyad</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={onChange} value={newUser.mail} type="email" name='mail' className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example3c">Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={onChange} value={newUser.password} type="password" name='password' className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4c">Şifre</label>
                                                </div>
                                            </div>
                                            {/* 
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4cd" className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4cd">Şifreyi Tekrar Gir</label>
                                                </div>
                                            </div> */}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={onChange} value={newUser.street} type="text" name='street' className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4c">Sokak</label>
                                                </div>
                                            </div> <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={onChange} value={newUser.avenue} type="text" name='avenue' className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4c">Mahalle</label>
                                                </div>
                                            </div> <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={onChange} value={newUser.no} type="text" name='no' className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example4c">No</label>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <select name="cityId" id="cityId" onChange={onChange2}>
                                                    <option disabled selected="selected">Seçiniz</option>
                                                    {cityList.map((c) => {
                                                        return (
                                                            <option value={c.id} >{c.description}</option>
                                                        )
                                                    })}
                                                </select> <br />
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4" >
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <select name="countyId" id="countyId" onChange={onChange}>
                                                    <option disabled selected="selected" >Seçiniz</option>
                                                    {countyList.map((c) => {
                                                        return (
                                                            <option value={c.id} >{c.description}</option>
                                                        )
                                                    })}
                                                </select> <br />
                                            </div>

                                            {/* 
                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div> */}

                                            <div className='d-flex justify-content-center' >
                                                {/* <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"> */}
                                                <button onClick={() => createUser()} type="button" className="btn btn-primary btn-md">Kaydol</button>
                                                {/* </div> */}
                                                {/* <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"> */}
                                                <button
                                                    onClick={() => navigate("/login")}
                                                    type="button"
                                                    className="btn btn-primary btn-md"
                                                    style={{ marginLeft: "10px" }}
                                                >
                                                    Giriş Yap
                                                </button>
                                                {/* </div> */}
                                            </div>


                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
