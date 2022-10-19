export interface IUser {
    email:string,
    id:string,
    token:string,
    tokenExpirationDate:Date
}

export class User {
    user:IUser;
    constructor(user:IUser) {
        this.user = user;
    }

    get token() {
        if(!this.user.tokenExpirationDate || new Date() > this.user.tokenExpirationDate)
            return null
        return this.user.token    
    }
}