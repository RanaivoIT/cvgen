import { arrayRemove, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"
import FormationFrom from "../forms/FormationForm"

const FormationItem = ({ id, formation, etablissement, ville, debut, fin, description }: any) => {

    const { getProfile } = useProfile()!

    const db = getFirestore(firebase)

    const [hidden, setHidden] = useState(false)

    const onShowForm = () => {
        setHidden(!hidden)
    }

    const onDeleteFormation = async () => {

        await updateDoc(doc(db, 'users', getProfile()?.id!), { formations: arrayRemove({ id: id, formation: formation, etablissement: etablissement, ville: ville, debut: debut, fin: fin, description: description }) })
        console.log('Delete formation')

    }

    return (

        <div className="card mb-2">

            <div className={(hidden) ? 'd-none' : 'card-header'}>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="content">
                        <h3 className="h4">{formation}</h3>
                        <p className="card-text">
                            {etablissement + ', ' + ville} <br />
                            {debut + ' - ' + fin}
                        </p>

                    </div>
                    <div className="content">
                        <button className="btn btn-outline-success" type="button" onClick={onShowForm}>
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" type="button" onClick={onDeleteFormation}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>

                </div>

            </div>

            <div className={(hidden) ? 'card-body' : 'd-none'}>
                <FormationFrom id={id} formation={formation} etablissement={etablissement} ville={ville} debut={debut} fin={fin} description={description} onShowForm={onShowForm} />
            </div>

        </div>

    )
}
export default FormationItem