import { arrayRemove, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"
import LoisirFrom from "../forms/LoisirForm"

const LoisirItem = ({ id, loisir }: any) => {

    const { getProfile } = useProfile()!

    const db = getFirestore(firebase)

    const [hidden, setHidden] = useState(false)

    const onShowForm = () => {
        setHidden(!hidden)
    }

    const onDeleteLoisir = async () => {

        await updateDoc(doc(db, 'users', getProfile()?.id!), { loisirs: arrayRemove({ id: id, loisir: loisir }) })
        console.log('Delete loisir')

    }

    return (

        <div className="card mb-2">

            <div className={(hidden) ? 'd-none' : 'card-header'}>

                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="h4">{loisir}</h3>

                    <div className="content">
                        <button className="btn btn-outline-success" type="button" onClick={onShowForm}>
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" type="button" onClick={onDeleteLoisir}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>

                </div>

            </div>

            <div className={(hidden) ? 'card-body' : 'd-none'}>
                <LoisirFrom id={id} loisir={loisir} onShowForm={onShowForm} />
            </div>

        </div>

    )
}
export default LoisirItem