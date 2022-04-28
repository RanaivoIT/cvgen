import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"

const CompetenceFrom = ({ id, competence, niveau, onShowForm }: any) => {

    const { getProfile } = useProfile()!

    const [title, setTitle] = useState(competence)
    const [grade, setGrade] = useState(niveau)

    const db = getFirestore(firebase)

    const onClickSave = () => {
        onShowForm()
        onUpdateCompetence()
    }

    const onUpdateCompetence = async () => {
        if (title !== competence || grade !== niveau) {
            await updateDoc(doc(db, 'users', getProfile()?.id!), { competences: arrayRemove({ id: id, competence: competence, niveau: niveau }) })
            await updateDoc(doc(db, 'users', getProfile()?.id!), { competences: arrayUnion({ id: id, competence: title, niveau: grade }) })
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
                <label htmlFor="titre-competence" className="form-label">Competence</label>
                <input type="text" className="form-control" id="titre-competence" required defaultValue={title} onChange={e => setTitle(e.target.value)} />
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

export default CompetenceFrom