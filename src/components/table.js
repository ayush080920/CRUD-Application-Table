import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../store';
import { Link } from 'react-router-dom';
import ModalPage from './modal';
import { searchUser } from '../store/slices/userSlice';

function UserTable() {
    const [id, setId] = useState()
    const [showPopup, setShowPopUp] = useState(false)
    const [radioData, setRadioData] = useState('')

    const dispatch = useDispatch()

    const { data, isLoading, error, searchItem } = useSelector((state) => {
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
    const handleSearch = (event) => {
        dispatch(searchUser(event.target.value))
    }


    return <div>

        {showPopup && <ModalPage id={id} showPopup={showPopup} setShowPopUp={setShowPopUp} />}

        <div className="navbar navbar-expand-lg bg-body-tertiary">
            <Link to='/newuser'><button type="button" className="btn btn-primary btn-lg m-3 w-10 " >+ ADD USER</button></Link>
            <form className="d-flex" role="search">
                <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} ></input>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <div className="form-check m-5" >
                <input className="form-check-input" type="radio" name="gender" checked={radioData === ''} onChange={(e) => { setRadioData('') }} />
                <label className="form-check-label">
                    All
                </label>
            </div>
            <div className="form-check m-5">
                <input className="form-check-input" type="radio" name="gender" value='male' checked={radioData === 'male'} onChange={(e) => { setRadioData(e.target.value) }} />
                <label className="form-check-label">
                    Male
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" value='female' checked={radioData === 'female'} onChange={(e) => { setRadioData(e.target.value) }} />
                <label className="form-check-label" >
                    Female
                </label>
            </div>
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
                data.filter((user) => {
                        if (data.length === 0) {
                            return user
                        }
                        else {
                            return user.name.toLowerCase().includes(searchItem.toLowerCase())
                        }
                    })
                    .filter((user) => {
                        if (radioData === 'male') {
                            return user.gender === radioData
                        }
                        else if (radioData === 'female') {
                            return user.gender === radioData
                        }
                        else return user
                    })

                    .map((user, index) => {

                        return <tbody key={index}>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td><Link to={`/showuser/${user.id}`}><button type="button" className="btn">Show</button></Link>
                                    <Link to={`/updateuser/${user.id}`}>
                                        <button type="button" className="btn">Edit</button></Link>
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