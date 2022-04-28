import faker from "@faker-js/faker"
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"
import ExperienceItem from "../items/ExperienceItem"

const ExperienceList = () => {

    const { getProfile } = useProfile()!

    const db = getFirestore(firebase)

    const onAddItem = async () => {
        await updateDoc(doc(db, 'users', getProfile()?.id!), { experiences: arrayUnion({ id: faker.datatype.uuid(), experience: faker.name.jobTitle(), etablissement: faker.company.companyName(), ville: faker.address.city(), debut: '2020-01-01', fin: '2030-01-01', description: faker.name.jobDescriptor() }) })
        console.log('Add experience')
    }

    return (

        <>
            <div className="list">
                {
                    (getProfile()?.experiences?.length !== 0) ? (

                        (getProfile()?.experiences?.map(({ id, experience, etablissement, ville, debut, fin, description }) => (
                            <ExperienceItem key={id} id={id} experience={experience} etablissement={etablissement} ville={ville} debut={debut} fin={fin} description={description} />
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
export default ExperienceList