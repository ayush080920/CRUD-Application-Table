import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../store';
import { Link } from 'react-router-dom';
import ModalPage from './modal';






function UserTable() {
    const [id, setId] = useState()
    const [showPopup, setShowPopUp] = useState(false)


    const dispatch = useDispatch()

    const { data, isLoading, error } = useSelector((state) => {
        return state.users
    })
    useEffect(() => {
        if (data.length === 0) {

            dispatch(fetchUsers())
        }
    }, [dispatch, data.length])



    if (isLoading) {
        return <div>Loading....</div>
    }
    if (error) {
        return <div>Error fetching data....</div>
    }


   



    return <div>

        {showPopup && <ModalPage id={id} showPopup={showPopup} setShowPopUp={setShowPopUp} />}

        <div className="d-flex flex-row-reverse">
            <Link to='/newuser'><button type="button" className="btn btn-primary btn-lg m-3 " >+ ADD USER</button></Link>

        </div>
        <table className='table table-striped-columns'>
            <thead >
                <tr >
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>
            </thead>

            {
                data.map((user, index) => {

                    return <tbody key={index}>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>{user.status}</td>
                            <td><Link to={`/showuser/${user.id}`}><button type="button" className="btn">Show</button></Link>
                                <Link to={`/updateuser/${user.id}`}>
                                    <button type="button"  className="btn">Edit</button></Link>
                                <button onClick={() => [setId(user), setShowPopUp(true)]} type="button" className="btn">Delete</button>
                            </td>
                        </tr>
                    </tbody>

                })
            }

            <tbody>



            </tbody>
        </table>
    </div >

}

export default UserTable;