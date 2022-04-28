import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"

const ExperienceFrom = ({ id, experience, etablissement, ville, debut, fin, description, onShowForm }: any) => {

    const { getProfile } = useProfile()!

    const [title, setTitle] = useState(experience)
    const [establishment, setEstablishment] = useState(etablissement)
    const [city, setCity] = useState(ville)
    const [start, setStart] = useState(debut)
    const [finish, setFinish] = useState(fin)
    const [info, setInfo] = useState(description)


    const db = getFirestore(firebase)

    const onClickSave = () => {
        onShowForm()
        onUpdateExperience()
    }

    const onUpdateExperience = async () => {
        if (title !== experience || establishment !== etablissement || city || ville || start !== debut || finish !== fin || info !== description) {
            await updateDoc(doc(db, 'users', getProfile()?.id!), { experiences: arrayRemove({ id: id, experience: experience, etablissement: etablissement, ville: ville, debut: debut, fin: fin, description: description }) })
            await updateDoc(doc(db, 'users', getProfile()?.id!), { experiences: arrayUnion({ id: id, experience: title, etablissement: establishment, ville: city, debut: start, fin: finish, description: info }) })
        }
    }
    return (

        <div className="card">
            <div className="card-body">
                <form className="my-2">

                    <div className="mb-3">
                        <label htmlFor="titre" className="form-label">Poste</label>
                        <input type="text" className="form-control" id="titre" required onChange={e => setTitle(e.target.value)} defaultValue={title} />
                    </div>

                    <div className="row">
                        <div className="mb-3 col-sm">
                            <label htmlFor="etablissement" className="form-label">Compagnie</label>
                            <input type="text" className="form-control" id="etablissement" required onChange={e => setEstablishment(e.target.value)} defaultValue={establishment} />
                        </div>
                        <div className="mb-3 col-sm">
                            <label htmlFor="ville" className="form-label">Ville</label>
                            <input type="text" className="form-control" id="ville" required onChange={e => setCity(e.target.value)} defaultValue={city} />
                        </div>
                    </div>


                    <div className="row">
                        <div className="mb-3 col">
                            <label htmlFor="debut" className="form-label">Date du debut</label>
                            <input type="date" className="form-control" id="debut" required onChange={e => setStart(e.target.value)} defaultValue={start} />
                        </div>
                        <div className="mb-3 col">
                            <label htmlFor="fin" className="form-label">Date du fin</label>
                            <input type="date" className="form-control" id="fin" required onChange={e => setFinish(e.target.value)} defaultValue={finish} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description-experience" className="form-label">Description</label>
                        <textarea className="form-control" id="description-experience" rows={3} required onChange={e => setInfo(e.target.value)} defaultValue={info}></textarea>
                    </div>

                    <button className="btn btn-primary" type="button" onClick={onClickSave}>
                        <i className="bi bi-check-lg"></i> Enregistrer
                    </button>

                </form>
            </div>
        </div>


    )
}

export default ExperienceFrom