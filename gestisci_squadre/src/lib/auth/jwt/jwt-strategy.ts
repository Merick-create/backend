import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { AtleteModule} from "../../../api/atleta/atleta-module";

export const JWT_SECRET = 'my_jwt_secret'

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    },
    async (token, done) => {
        try{
            const user = await AtleteModule.findById(token.id);
            console.log(user);
            if(user){
                done(null, user.toObject());
            }else{
                done(null, false, { message: 'invalid token' });
            }
        }catch(err){
            done(err)
        }
    })
)