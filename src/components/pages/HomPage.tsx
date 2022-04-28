import { Link } from "react-router-dom"
import DetailFrom from "../forms/DetailForm"
import CompetenceList from "../lists/CompetenceList"
import ExperienceList from "../lists/ExperienceList"
import FormationList from "../lists/FormationList"
import LangueList from "../lists/LangueList"
import LoisirList from "../lists/LoisirList"
import QualiteList from "../lists/QualiteList"

const HomePage = () => {

    return (
        <>
            {
                (localStorage.getItem('Profile')) ?
                    (
                        <>
                            <div className="accordion accordion-flush mb-3" id="accordionFlush">

                                {/** Details Personnels*/}

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-detail">
                                        <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-detail" aria-expanded="false" aria-controls="flush-collapse-detail">
                                            Détails Personnels
                                        </button>
                                    </h2>
                                    <div id="flush-collapse-detail" className="accordion-collapse collapse show" aria-labelledby="flush-detail" data-bs-parent="#accordionFlush">
                                        <div className="accordion-body">
                                            <DetailFrom />
                                        </div>
                                    </div>
                                </div>

                                {/** Formtion et Education*/}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-formation">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-formation" aria-expanded="false" aria-controls="flush-collapse-formation">
                                            Formation et Education
                                        </button>
                                    </h2>
                                    <div id="flush-collapse-formation" className="accordion-collapse collapse" aria-labelledby="flush-formation" data-bs-parent="#accordionFlush">
                                        <div className="accordion-body">
                                            <FormationList />
                                        </div>
                                    </div>
                                </div>

                                {/** Experience Professionnelle*/}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-experience">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-experience" aria-expanded="false" aria-controls="flush-collapse-experience">
                                            Expérience Professionnelle
                                        </button>
                                    </h2>
                                    <div id="flush-collapse-experience" className="accordion-collapse collapse" aria-labelledby="flush-experience" data-bs-parent="#accordionFlush">
                                        <div className="accordion-body">
                                            <ExperienceList />
                                        </div>
                                    </div>
                                </div>

                                {/** Competence */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-competence">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-competence" aria-expanded="false" aria-controls="flush-collapse-competence">
                                            Compétences
                                        </button>
                                    </h2>
                                    <div id="flush-collapse-competence" className="accordion-collapse collapse" aria-labelledby="flush-competence" data-bs-parent="#accordionFlush">
                                        <div className="accordion-body">
                                            <CompetenceList />
                                        </div>
                                    </div>
                                </div>

                                {/** Langue */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-langue">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-langue" aria-expanded="false" aria-controls="flush-collapse-langue">
                                            Langues
                                        </button>
                                    </h2>
                                    <div id="flush-collapse-langue" className="accordion-collapse collapse" aria-labelledby="flush-langue" data-bs-parent="#accordionFlush">
                                        <div className="accordion-body">
                                            <LangueList />
                                        </div>
                                    </div>
                                </div>

                                {/** Qualite */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-qualite">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-qualite" aria-expanded="false" aria-controls="flush-collapse-qualite">
                                            Qualités
                                        </button>
                                    </h2>
                                    <div id="flush-collapse-qualite" className="accordion-collapse collapse" aria-labelledby="flush-langue" data-bs-parent="#accordionFlush">
                                        <div className="accordion-body">
                                            <QualiteList />
                                        </div>
                                    </div>
                                </div>

                                {/** Loisir */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-loisir">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-loisir" aria-expanded="false" aria-controls="flush-collapse-loisir">
                                            Loisirs
                                        </button>
                                    </h2>
                                    <div id="flush-collapse-loisir" className="accordion-collapse collapse" aria-labelledby="flush-loisir" data-bs-parent="#accordionFlush">
                                        <div className="accordion-body">
                                            <LoisirList />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <Link to='/cv' className="btn btn-outline-success">Voir mon CV</Link>

                        </>
                    ) : (
                        <div className="card col-md-6 mx-auto my-5">
                            <div className="card-body">
                                <h2 className="text-center text-primary mt-5">
                                    Bonjour, Bienvenue sur CVGen (CV Generator)
                                </h2>
                                <p className="text-center my-5">
                                    Veuillez vous inscrire pour bénéficier gratuitement de notre service de génération d'un CV automatique
                                </p>
                            </div>
                        </div>
                    )
            }


        </>
    )
}
export default HomePage