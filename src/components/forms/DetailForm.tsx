import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"
import faker from "@faker-js/faker"
import { userConverter } from "../../data/firebase/userConverter"

const DetailFrom = () => {

    const { getProfile } = useProfile()!

    const db = getFirestore(firebase)

    const storage = getStorage(firebase)

    const onAvatarChanged = async (e: any) => {

        const file: File = e.target.files[0]

        const extension = file.name.substring(file.name.lastIndexOf('.'))

        const filename = 'images/' + faker.datatype.uuid() + extension

        const storageRef = ref(storage, filename)

        let lastRef: any = null

        if (getProfile()?.avatar !== 'https://firebasestorage.googleapis.com/v0/b/cvgen-124c1.appspot.com/o/images%2Favatar.png?alt=media&token=0c148974-329b-4e81-951f-74a50d6df09b') {
            lastRef = ref(storage, getProfile()?.avatar!)
        }

        uploadBytes(storageRef, file).then(async (snapshot) => {

            const url = (await getDownloadURL(snapshot.ref)).toString()

            await updateDoc(doc(db, 'users', getProfile()?.id!).withConverter(userConverter), { 'avatar': url })
                .then(
                    () => {
                        if (lastRef)
                            deleteObject(lastRef).then(() => {
                                console.log(lastRef.fullPath + ' has deleted !')
                            })
                        console.log(storageRef.fullPath + ' has added !')
                        alert('Image Uploaded!')
                    }
                )
        })

    }

    const onNomChanged = async (e: any) => {
        await updateDoc(doc(db, 'users', getProfile()?.id!), { nom: e.target.value })
    }
    const onPrenomChanged = async (e: any) => {
        await updateDoc(doc(db, 'users', getProfile()?.id!), { prenom: e.target.value })
    }
    const onAdresseChanged = async (e: any) => {
        await updateDoc(doc(db, 'users', getProfile()?.id!), { adresse: e.target.value })
    }
    const onTelChanged = async (e: any) => {
        await updateDoc(doc(db, 'users', getProfile()?.id!), { tel: e.target.value })
    }
    const onTitreChanged = async (e: any) => {
        await updateDoc(doc(db, 'users', getProfile()?.id!), { titre: e.target.value })
    }
    const onDescriptionChanged = async (e: any) => {
        await updateDoc(doc(db, 'users', getProfile()?.id!), { description: e.target.value })
    }
    return (

        <div className="card">
            <div className="card-body">


                <form className="my-2">
                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">
                            <img
                                src={getProfile()?.avatar}
                                className="img-thumbnail" alt="Avatar" width={150} />

                        </label>
                        <input type="file" className="form-control" id="avatar" onChange={onAvatarChanged} hidden />

                    </div>

                    <div className="row">
                        <div className="mb-3 col-sm">
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input type="text" className="form-control" id="nom" defaultValue={getProfile()?.nom} onChange={onNomChanged} required />
                        </div>
                        <div className="mb-3 col-sm">
                            <label htmlFor="prenom" className="form-label">Prénom</label>
                            <input type="text" className="form-control" id="prenom" defaultValue={getProfile()?.prenom} onChange={onPrenomChanged} required />
                        </div>
                    </div>

                    <div className="mb-3 ">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control disable" id="email" defaultValue={getProfile()?.email} required disabled />
                    </div>

                    <div className="row">
                        <div className="mb-3 col-sm">
                            <label htmlFor="tel" className="form-label">Tel</label>
                            <input type="tel" className="form-control" id="tel" defaultValue={getProfile()?.tel} onChange={onTelChanged} required />
                        </div>
                        <div className="mb-3 col-sm">
                            <label htmlFor="adresse" className="form-label">Adresse</label>
                            <input type="text" className="form-control" id="adresse" defaultValue={getProfile()?.adresse} onChange={onAdresseChanged} required />
                        </div>
                    </div>


                    <div className="mb-3">
                        <label htmlFor="titre-profil" className="form-label">Titre du Profil</label>
                        <input type="text" className="form-control" id="titre-profil" defaultValue={getProfile()?.titre} onChange={onTitreChanged} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description-profil" className="form-label">Description du Profil</label>
                        <textarea className="form-control" id="description-profil" rows={3} defaultValue={getProfile()?.description} onChange={onDescriptionChanged} required></textarea>

                    </div>


                </form>

            </div>
        </div>


    )
}
export default DetailFrom