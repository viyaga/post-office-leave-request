import { deletePendingLeaveData } from '@/services'
import './deleteRegularEmployee.scss'
import { deletePendingLeave } from '@/redux/slices/commonSlice'
import { useDispatch } from 'react-redux'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

const DeleteRegularEmployee = ({ deleteData, setDeleteData }) => {
    const [isLoading, startTransiton] = useTransition()
    const dispatch = useDispatch()

    const handleDelete = () => {

        startTransiton(async () => {
            const res = await deletePendingLeaveData(deleteData._id)

            if (res.error) {
                return toast.error(res.error)
            }

            if (res.success) {
                dispatch(deletePendingLeave(deleteData._id))
                setDeleteData(null)
            }
        })
    }

    return (
        <div className="deleteRegularEmployee">
            <div className="modal">
                <h1>Are you sure you want to delete regular employee {deleteData.name}? This action cannot be undone</h1>
                <div className="buttons">
                    <button  onClick={handleDelete}>{isLoading ? "Deleting..." : "Delete"}</button>
                    <button onClick={() => setDeleteData(null)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteRegularEmployee