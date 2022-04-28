import User from "../models/User";

export const userConverter = {
    toFirestore: (user: User) => {
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            nom: user.nom,
            prenom: user.prenom,
            tel: user.tel,
            adresse: user.adresse,
            titre: user.titre,
            description: user.description,
            formations: user.formations,
            experiences: user.experiences,
            competences: user.competences,
            qualites: user.qualites,
            langues: user.langues,
            loisirs: user.loisirs
        }
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options)
        const user: User = {
            id: data.id,
            email: data.email,
            password: data.password,
            avatar: data.avatar,
            nom: data.nom,
            prenom: data.prenom,
            tel: data.tel,
            adresse: data.adresse,
            titre: data.titre,
            description: data.description,
            formations: data.formations,
            experiences: data.experiences,
            competences: data.competences,
            qualites: data.qualites,
            langues: data.langues,
            loisirs: data.loisirs
        }
        return user
    }
}