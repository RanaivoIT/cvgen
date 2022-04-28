import { useEffect, useState } from "react"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import { useProfile } from "../../contexts/ProfileContext"
import { firebase } from "../../firebase"
import { userConverter } from "../../data/firebase/userConverter"
import { useNavigate } from "react-router-dom"
import User from "../../data/models/User"

const LoginPage = () => {

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


    const loginSubmit = async (e: any) => {
        e.preventDefault()

        if (email && password) {

            const db = getFirestore(firebase)

            const docs = collection(db, 'users').withConverter(userConverter)
            const q = query(docs, where('email', '==', email))
            const querySnapshot = await getDocs(q)

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    if (doc.get('password') === password) {
                        const user: User = doc.data()
                        loginUser(user)
                        alert('Vous êtes connecté !')
                    } else {
                        alert('Verifier votre mot de passe')
                    }

                })
            } else {
                alert('Verifier votre email')
            }

        } else {
            alert('Veuillez remplir tous les champs')
        }

    }


    return (

        <div className="card col-md-6 mx-auto my-5">
            <div className="card-body">
                <h2 className="text-center">Connexion</h2>
                <form onSubmit={e => loginSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" required onChange={onEmailChanged} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de Passe</label>
                        <input type="password" className="form-control" id="password" required onChange={onPasswordChange} />
                    </div>
                    <button className="btn btn-primary" type="submit">Se Connecter</button>
                </form>
            </div>
        </div>

    )
}
export default LoginPage