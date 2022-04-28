import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"

const LangueFrom = ({ id, langue, niveau, onShowForm }: any) => {

    const { getProfile } = useProfile()!

    const [title, setTitle] = useState(langue)
    const [grade, setGrade] = useState(niveau)

    const db = getFirestore(firebase)

    const onClickSave = () => {
        onShowForm()
        onUpdateLangue()
    }

    const onUpdateLangue = async () => {
        if (title !== langue || grade !== niveau) {
            await updateDoc(doc(db, 'users', getProfile()?.id!), { langues: arrayRemove({ id: id, langue: langue, niveau: niveau }) })
            await updateDoc(doc(db, 'users', getProfile()?.id!), { langues: arrayUnion({ id: id, langue: title, niveau: grade }) })
        }
    }


    const niveaux = [
        'Très faible',
        'Faible',
        'Moyen',
        'Bon',
        'Très Bon']

    return (

        <form className="my-2" >

            <div className="mb-3">
                <label htmlFor="titre-langue" className="form-label">Langue</label>
                <input type="text" className="form-control" id="titre-langue" required defaultValue={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="niveau-competence" className="form-label">Niveau</label>
                <select className="form-select" aria-label="niveau-competence" id="niveau-competence" defaultValue={grade} onChange={e => setGrade(e.target.value)}>

                    {
                        niveaux.map(niveau => (
                            <option key={niveau} value={niveau}>{niveau}</option>
                        ))
                    }

                </select>
            </div>


            <button className="btn btn-primary" type="button" onClick={onClickSave}>
                <i className="bi bi-check-lg"></i> Enregistrer
            </button>

        </form >

    )
}

export default LangueFrom