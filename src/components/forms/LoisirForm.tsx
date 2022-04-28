import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"

const LoisirFrom = ({ id, loisir, onShowForm }: any) => {

    const { getProfile } = useProfile()!

    const [title, setTitle] = useState(loisir)

    const db = getFirestore(firebase)

    const onClickSave = () => {
        onShowForm()
        onUpdateLoisir()
    }

    const onUpdateLoisir = async () => {
        if (title !== loisir) {
            await updateDoc(doc(db, 'users', getProfile()?.id!), { loisirs: arrayRemove({ id: id, loisir: loisir }) })
            await updateDoc(doc(db, 'users', getProfile()?.id!), { loisirs: arrayUnion({ id: id, loisir: title }) })
        }
    }

    return (

        <form className="my-2" >

            <div className="mb-3">
                <label htmlFor="titre-loisir" className="form-label">Loisir</label>
                <input type="text" className="form-control" id="titre-loisir" required defaultValue={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <button className="btn btn-primary" type="button" onClick={onClickSave}>
                <i className="bi bi-check-lg"></i> Enregistrer
            </button>

        </form >

    )
}

export default LoisirFrom