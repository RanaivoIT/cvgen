import { arrayRemove, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"
import CompetenceFrom from "../forms/CompetenceForm"

const CompetenceItem = ({ id, competence, niveau }: any) => {

    const { getProfile } = useProfile()!

    const db = getFirestore(firebase)

    const [hidden, setHidden] = useState(false)

    const onShowForm = () => {
        setHidden(!hidden)
    }

    const onDeleteCompetence = async () => {

        await updateDoc(doc(db, 'users', getProfile()?.id!), { competences: arrayRemove({ id: id, competence: competence, niveau: niveau }) })
        console.log('Delete competence')

    }

    return (

        <div className="card mb-2">

            <div className={(hidden) ? 'd-none' : 'card-header'}>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="content">
                        <h3 className="h4">{competence}</h3>
                        <p className="card-text">{niveau}</p>
                    </div>

                    <div className="content">
                        <button className="btn btn-outline-success" type="button" onClick={onShowForm}>
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" type="button" onClick={onDeleteCompetence}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>

                </div>

            </div>

            <div className={(hidden) ? 'card-body' : 'd-none'}>
                <CompetenceFrom id={id} competence={competence} niveau={niveau} onShowForm={onShowForm} />
            </div>

        </div>

    )
}
export default CompetenceItem