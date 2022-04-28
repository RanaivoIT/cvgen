import faker from "@faker-js/faker"
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"
import QualiteItem from "../items/QualiteItem"

const QualiteList = () => {

    const { getProfile } = useProfile()!

    const db = getFirestore(firebase)

    const onAddItem = async () => {
        await updateDoc(doc(db, 'users', getProfile()?.id!), { qualites: arrayUnion({ id: faker.datatype.uuid(), qualite: faker.lorem.words(2) }) })
        console.log('Add qualite')
    }

    return (

        <>
            <div className="list">
                {
                    (getProfile()?.qualites?.length !== 0) ? (

                        (getProfile()?.qualites?.map(({ id, qualite }) => (
                            <QualiteItem key={id} id={id} qualite={qualite} />
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
export default QualiteList