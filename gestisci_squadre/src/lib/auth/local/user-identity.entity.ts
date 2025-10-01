import { AtletaEntity } from "../../../api/atleta/atleta-entity"

export type UserIdentity = {
    id: string,
    provider: string,
    credentials: {
        username: string,
        hashedPassword: string
    },
    user: AtletaEntity,
    refreshToken: string
}