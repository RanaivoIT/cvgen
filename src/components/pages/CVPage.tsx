import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useProfile } from "../../contexts/ProfileContext"
const CVPage = () => {

    const navigator = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('Profile')) {
            navigator('/')
        }
    })

    const { getProfile } = useProfile()!

    const onGeneratePDF = () => {
        const element: any = document.getElementById('cv')?.innerHTML
        const newWindow = window.open()
        newWindow?.document.write(
            '<html><head><title>MonCV</title><link href = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel = "stylesheet" integrity = "sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin = "anonymous" ><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></head><body>'+element+'</body><html/>'
        ); 
        newWindow?.print();
    }

    return (
        <div className="container-fluid" >

            <div className="content mb-3 d-flex justify-content-between">
                <Link to='/' className="btn btn-warning">Modifier mon CV </Link>
                <button type="button" className="btn btn-success" onClick={onGeneratePDF}>Version Imprimable</button>
            </div>

            <div className="card" id="cv">
                <div className="card-body">
                    <div className="row mb-3">

                        <div className="col-sm-3">
                            <img
                                src={getProfile()?.avatar}
                                className="img-fluid rounded" alt="Avatar" />
                        </div>
                        <div className="col-sm">
                            <h2 className="nom text-primary">{getProfile()?.prenom} {getProfile()?.nom}</h2>

                            <h2 className="h3 text-primary mb-3">{getProfile()?.titre}</h2>

                            <div className="content profile mb-4">
                                <h3>Profile</h3>
                                <hr />
                                <p>
                                    {getProfile()?.description}
                                </p>
                            </div>

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="content mb-4">
                                <h3 className="">Détails Personnels</h3>
                                <hr />
                                <p><i className="bi bi-envelope text-primary"></i> {getProfile()?.email} </p>
                                <p><i className="bi bi-telephone text-primary"></i> {getProfile()?.tel} </p>
                                <p><i className="bi bi-house text-primary"></i> {getProfile()?.adresse} </p>
                            </div>

                            <div className="content mb-4">
                                <h3 className="">Compétences</h3>
                                <hr />
                                {(getProfile()?.competences?.map(({ id, competence, niveau }) => (
                                    <p><span className="text-primary">{competence}</span>, {niveau}</p>
                                )))}
                            </div>
                            <div className="content mb-4">
                                <h4 className="">Langues</h4>
                                <hr />
                                {(getProfile()?.langues?.map(({ id, langue, niveau }) => (
                                    <p> <span className="text-primary">{langue}</span> , {niveau}</p>
                                )))}
                            </div>

                            <div className="content mb-4">
                                <h3 className="">Qualités</h3>
                                <hr />
                                {(getProfile()?.qualites?.map(({ id, qualite }) => (
                                    <p><span className="text-primary">{qualite}</span></p>
                                )))}
                            </div>

                            <div className="content mb-4">
                                <h3 className="">Loisirs</h3>
                                <hr />
                                {(getProfile()?.loisirs?.map(({ id, loisir }) => (
                                    <p><span className="text-primary">{loisir}</span></p>
                                )))}
                            </div>


                        </div>

                        <div className="col-sm">


                            <div className="content">
                                <h3 >Formation et Education</h3>
                                <hr />
                                {
                                    (getProfile()?.formations?.map(({ id, formation, etablissement, ville, debut, fin, description }) => (
                                        <div className="content">
                                            <h4 className="text-primary">{formation}</h4>
                                            <p> <i className="bi bi-geo-alt text-primary"></i>{etablissement}, {ville}</p>
                                            <p> <i className="bi bi-calendar text-primary"></i> {debut} / {fin}</p>
                                            <p>{description}</p>
                                        </div>
                                    )))
                                }
                            </div>

                            <div className="content">
                                <h3 >Expérience Professionnelle</h3>
                                <hr />
                                {
                                    (getProfile()?.experiences?.map(({ id, experience, etablissement, ville, debut, fin, description }) => (
                                        <div className="content">
                                            <h4 className="text-primary">{experience}</h4>
                                            <p> <i className="bi bi-geo-alt text-primary"></i> {etablissement}, {ville}</p>
                                            <p><i className="bi bi-calendar text-primary"></i> {debut} / {fin}</p>
                                            <p>{description}</p>
                                        </div>
                                    )))
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}
export default CVPage