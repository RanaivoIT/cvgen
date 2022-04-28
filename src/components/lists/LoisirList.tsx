import faker from "@faker-js/faker"
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"
import LoisirItem from "../items/LoisirItem"

const LoisirList = () => {

    const { getProfile } = useProfile()!

    const db = getFirestore(firebase)

    const onAddItem = async () => {
        await updateDoc(doc(db, 'users', getProfile()?.id!), { loisirs: arrayUnion({ id: faker.datatype.uuid(), loisir: faker.lorem.words(2) }) })
        console.log('Add loisir')
    }

    return (

        <>
            <div className="list">
                {
                    (getProfile()?.loisirs?.length !== 0) ? (

                        (getProfile()?.loisirs?.map(({ id, loisir }) => (
                            <LoisirItem key={id} id={id} loisir={loisir} />
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
export default LoisirList