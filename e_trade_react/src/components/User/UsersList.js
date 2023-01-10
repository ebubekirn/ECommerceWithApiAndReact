import React,{useEffect,useContext,useState} from 'react'
import { UserContext } from '../../context/UserContext'
import { deleteUser, getUsers } from '../../functions/http/httpUser'

export default function UsersList() {
    const [deleted,setDeleted] = useState(false)
    const context = useContext(UserContext)

    useEffect(()=>{
        async function getAllUsers(){
            const users = await getUsers()
            context.setUser(users)
        }
        getAllUsers()
    },[deleted])
  return (
    <div  className='row'>
        <div className='col-md-7'>
        <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>İsim Soyisim</th>
                    <th>Mail</th>
                    <th>Rol</th>
                    <th>Adres</th>
                    {/* <th>Kategori</th>
                    <th>Birim</th>
                    <th>Kdv</th> */}
                 
                </tr>
            </thead>
            <tbody>
                {context.users.map(b => {
                    return ( 
                        <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{b.entityname}</td>
                            <td>{b.mail}</td>
                            <td>{b.role}</td>
                            <td>{b.street}</td>
                            <td>
                                <button 
                                className='btn btn-danger' 
                                onClick={() => deleteUser(b.id)
                                .then(() => {
                                    alert("Kullanıcı silindi.")
                               setDeleted(true)
                                  // window.location.reload()
                                })}
                                > Kullanıcı Sil </button>
                            </td>
                        </tr>                     
                    )

                })}

            </tbody>
        </table>
        </div>
        </div>
  )
}
