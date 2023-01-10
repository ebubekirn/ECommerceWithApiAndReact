import React, { useEffect, useContext, useState } from 'react'
import { Button, Modal, ModalFooter } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { CategoryContext } from '../../context/CatContext'
import { deleteCategory, getCategories } from '../../functions/http/httpCat'
import CategoriesCreate from './CategoriesCreate'
import CategoriesUpdate from './CategoriesUpdate'


export default function CategoriesList() {

  const [deleted, setDeleted] = useState(false)
  const navigate = useNavigate()
  const context = useContext(CategoryContext)
  
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [show2, setShow2] = useState(false)
  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)

  useEffect(() => {
    async function getAllCategories() {
      const categories = await getCategories()
      context.setCategory(categories)
    }
    getAllCategories()
  }, [deleted])



  return (
    <>
      <div className='row'>
        <div className='col-md-7'>
          <button className='btn btn-primary'
            onClick={handleShow}  > Yeni Kategori</button>
          <table className='table'>
            <thead>
              <tr>
                <th>Kategori No</th>
                <th>Kategori Adı</th>
              </tr>
            </thead>
            <tbody>
              {context.categories.map(b => {
                return (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.description}</td>

                    <td>
                      <button className='btn btn-success' onClick={()=>
                        navigate(handleShow2(),{
                          state:{id:b.id},
                        })
                      } >Kategori Güncelle </button>
                    </td>
                    <td>
                      <button className='btn btn-danger' onClick={() => deleteCategory(b.id)
                        .then(() => {
                          alert("Ürün Silindi")
                          setDeleted(!deleted)
                        })
                      }>Ürün Sil</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title>
            Katagori Ekle
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoriesCreate />
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
            Katagori Güncelle
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoriesUpdate />
        </Modal.Body>
        <ModalFooter>
          <Button onClick={handleClose2} variant='secondary'>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
