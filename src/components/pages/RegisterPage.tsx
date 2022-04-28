import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { firebase } from "../../firebase"
import { useProfile } from "../../contexts/ProfileContext"
import User from "../../data/models/User"
import faker from "@faker-js/faker"

const RegisterPage = () => {

    const navigator = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('Profile')) {
            navigator('/')
        }
    })

    const { loginUser } = useProfile()!

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onEmailChanged = (e: any) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e: any) => {
        setPassword(e.target.value)
    }


    const registerSubmit = async (e: any) => {
        e.preventDefault()

        if (email && password) {

            const db = getFirestore(firebase)
            const docs = collection(db, 'users')
            const q = query(docs, where('email', '==', email))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {


                const user: User = {
                    id: faker.datatype.uuid(),
                    email: email,
                    password: password,
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/cvgen-124c1.appspot.com/o/images%2Favatar.png?alt=media&token=0c148974-329b-4e81-951f-74a50d6df09b'
                }

                await setDoc(doc(db, 'users', user.id!), user)
                    .then(
                        () => {
                            loginUser(user)
                            alert('Vous êtes inscrit et connecté !')
                            navigator('/')
                        }
                    )
                    .catch(
                        (e) => {
                            alert(e.getMessage)
                        }
                    )

            } else {
                alert('Vous avez déjà un compte avec cet email')
            }

        } else {
            alert('Veuillez remplir tous les champs')
        }

    }

    return (

        <div className="card col-md-6 mx-auto my-5">
            <div className="card-body">
                <h2 className="text-center">Inscription</h2>
                <form onSubmit={e => registerSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" required onChange={onEmailChanged} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de Passe</label>
                        <input type="password" className="form-control" id="password" required onChange={onPasswordChange} minLength={6} />
                    </div>
                    <button className="btn btn-primary" type="submit">S'inscrire</button>
                </form>
            </div>
        </div>

    )
}
export default RegisterPage