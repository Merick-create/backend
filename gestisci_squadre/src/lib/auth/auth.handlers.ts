import './local/local-strategy';
import './jwt/jwt-strategy';

import { AtletaEntity as iUser } from '../../api/atleta/atleta-entity'

declare global {
    namespace Express {
        interface User extends iUser { }
    }
}