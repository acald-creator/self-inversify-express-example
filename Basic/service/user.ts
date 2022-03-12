import { injectable } from "inversify";

export interface IUser {
    email: String;
    name: String;
}

@injectable()
export class UserService {
    private userStorage: IUser[] = [{
        email: 'lorem@ipsum.com',
        name: 'Lorem'
    }, {
        email: 'doloe@sit.com',
        name: 'Dolor'
    }];

    public getUsers(): IUser[] {
        return this.userStorage;
    }

    public getUser(id: string): IUser {
        let findEmail = this.userStorage.find(user => user.email);

        if(typeof findEmail === 'undefined') {
            throw new Error(`Could not find an email address with id: ${id}`);
        }

        return findEmail;
    }

    public newUser(user: IUser): IUser {
        this.userStorage.push(user);
        return user;
    }

    public updateUser(id: string, user: IUser): IUser {
        this.userStorage.forEach((entry, index) => {
            if (entry.name === id) {
                this.userStorage[index] = user;
            }
        });

        return user;
    }

    public deleteUser(id: string): string {
        this.userStorage = this.userStorage.filter(user => user.name !== id);
        return id;
    }
}