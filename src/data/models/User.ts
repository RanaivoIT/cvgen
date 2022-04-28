export default interface User {
    id?: string
    email?: string
    password?: string
    avatar?: string
    nom?: string
    prenom?: string
    tel?: string
    adresse?: string
    titre?: string
    description?: string
    formations?: any[]
    experiences?: any[]
    competences?: any[]
    qualites?: any[]
    langues?: any[]
    loisirs?: any[]
}