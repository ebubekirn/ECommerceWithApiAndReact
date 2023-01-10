import React, { useEffect, useContext, useState } from 'react'
import { deleteProduct, getProducts } from '../../functions/http/http'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, ModalFooter } from 'react-bootstrap'
import { ProductContext } from '../../context/ProContext'
import ProductCreate from './ProductCreate'
import ProductUpdate from './ProductUpdate'

export default function ProductList() {
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()
    const context = useContext(ProductContext)
    const [quantity, setQuantity] = useState(0);

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [show2, setShow2] = useState(false)
    const handleClose2 = () => setShow2(false)
    const handleShow2 = () => setShow2(true)

    useEffect(() => {
        async function getAllProducts() {
            const products = await getProducts()
            context.setProduct(products)
        }
        getAllProducts()
    }, [deleted])

    const increaseQua = () => {
        setQuantity(quantity + 1)
    }

    const decraseQua = () => {
        setQuantity(quantity - 1)
    }

    console.log(quantity)

    return (
        <div className='row'>
            <div className='col-md-7'>
                <button className='btn btn-primary'
                    onClick={handleShow}
                >Yeni Ürün</button>
                {/* <p>{date}</p> */}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Resim</th>
                            <th>Ürün Adı</th>
                            <th>Açıklama</th>
                            <th>Fiyat</th>
                            {/* <th>Kategori</th>
                                <th>Birim</th>
                                <th>Kdv</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {context.products.map(b => {
                            return (
                                <tr key={b.id}>
                                    <td><img width={"50px"} src={b.productImage} /></td>
                                    <td>{b.productname}</td>
                                    <td>{b.description}</td>
                                    <td>{b.unitprice}</td>
                                    {/* <td>{b.categoryid}</td>
                                        <td>{b.unitid}</td>
                                        <td>{b.vatid}</td> */}

                                    <td>
                                        <button
                                            className='btn btn-success'
                                            onClick={() =>
                                                navigate(handleShow2(), {
                                                    state: { id: b.id },
                                                })}> Ürün Güncelle </button>
                                    </td>
                                    <td>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => deleteProduct(b.id)
                                                .then(() => {
                                                    alert("Ürün silindi.")
                                                    setDeleted(!deleted)
                                                    // window.location.reload()
                                                })}
                                        > Ürün Sil </button>
                                    </td>
                                    <td>
                                        {quantity === 0 ? (
                                            <Button className="w-100" onClick={increaseQua}>
                                                + Add To Cart
                                            </Button>
                                        ) : (
                                            <div
                                                className="d-flex align-items-center flex-column"
                                                style={{ gap: ".5rem" }}
                                            >
                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{ gap: ".5rem" }}
                                                >
                                                    <Button onClick={decraseQua}>-</Button>
                                                    <div>
                                                        <span className="fs-3">{quantity}</span> in cart
                                                    </div>
                                                    <Button onClick={increaseQua}>+</Button>
                                                </div>
                                                <Button
                                                    // onClick={() => removeFromCart(id)}
                                                    variant="danger"
                                                    size="sm"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )

                        })}

                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        Ürün Ekle
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductCreate />
                </Modal.Body>
                <ModalFooter>
                    <Button onClick={handleClose} variant='secondary'>
                        Kapat
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        Ürün Güncelle
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductUpdate />
                </Modal.Body>
                <ModalFooter>
                    <Button onClick={handleClose2} variant='secondary'>
                        Kapat
                    </Button>
                </ModalFooter>
            </Modal>

    
        </div>

    )
}
