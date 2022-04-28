import { arrayRemove, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"
import QualiteFrom from "../forms/QualiteForm"

const QualiteItem = ({ id, qualite }: any) => {

    const { getProfile } = useProfile()!

    const db = getFirestore(firebase)

    const [hidden, setHidden] = useState(false)

    const onShowForm = () => {
        setHidden(!hidden)
    }

    const onDeleteQualite = async () => {

        await updateDoc(doc(db, 'users', getProfile()?.id!), { qualites: arrayRemove({ id: id, qualite: qualite }) })
        console.log('Delete qualite')

    }

    return (

        <div className="card mb-2">

            <div className={(hidden) ? 'd-none' : 'card-header'}>

                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="h4">{qualite}</h3>

                    <div className="content">
                        <button className="btn btn-outline-success" type="button" onClick={onShowForm}>
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" type="button" onClick={onDeleteQualite}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>

                </div>

            </div>

            <div className={(hidden) ? 'card-body' : 'd-none'}>
                <QualiteFrom id={id} qualite={qualite} onShowForm={onShowForm} />
            </div>

        </div>

    )
}
export default QualiteItem