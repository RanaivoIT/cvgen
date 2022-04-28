import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"

const QualiteFrom = ({ id, qualite, onShowForm }: any) => {

    const { getProfile } = useProfile()!

    const [title, setTitle] = useState(qualite)

    const db = getFirestore(firebase)

    const onClickSave = () => {
        onShowForm()
        onUpdateQualite()
    }

    const onUpdateQualite = async () => {
        if (title !== qualite) {
            await updateDoc(doc(db, 'users', getProfile()?.id!), { qualites: arrayRemove({ id: id, qualite: qualite }) })
            await updateDoc(doc(db, 'users', getProfile()?.id!), { qualites: arrayUnion({ id: id, qualite: title }) })
        }
    }

    return (

        <form className="my-2" >

            <div className="mb-3">
                <label htmlFor="titre-qualite" className="form-label">Qualite</label>
                <input type="text" className="form-control" id="titre-qualite" required defaultValue={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <button className="btn btn-primary" type="button" onClick={onClickSave}>
                <i className="bi bi-check-lg"></i> Enregistrer
            </button>

        </form >

    )
}

export default QualiteFrom