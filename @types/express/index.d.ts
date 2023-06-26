import {userInterface} from '../../src/app/Models/User'
declare global{
    namespace Express{
        interface Request {
            userInfo:userInterface,
            roles:number[],
            user:string,
            email:string|string[],
            username:string,
            path:string,
            files: any

        }
        interface Response {

        }
    }
}