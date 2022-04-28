import faker from "@faker-js/faker"
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"
import CompetenceItem from "../items/CompetenceItem"

const CompetenceList = () => {

    const { getProfile } = useProfile()!

    const db = getFirestore(firebase)

    const onAddItem = async () => {
        await updateDoc(doc(db, 'users', getProfile()?.id!), { competences: arrayUnion({ id: faker.datatype.uuid(), competence: faker.lorem.words(1), niveau: 'Bon' }) })
        console.log('Add competence')
    }

    return (

        <>
            <div className="list">
                {
                    (getProfile()?.competences?.length !== 0) ? (

                        (getProfile()?.competences?.map(({ id, competence, niveau }) => (
                            <CompetenceItem key={id} id={id} competence={competence} niveau={niveau} />
                        )))

                    ) : (
                        <div className="card mb-2">
                            <div className="card-body d-flex justify-content-between align-items-center">

                                <div className="content">
                                    <h3>Vide</h3>
                                </div>

                            </div>

                        </div>
                    )
                }

            </div>

            <button className="btn btn-secondary col-12 my-2" onClick={onAddItem}>
                <i className="bi bi-plus"></i> Ajouter
            </button>
        </>

    )
}
export default CompetenceList