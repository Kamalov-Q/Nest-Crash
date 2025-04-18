import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
    private users = [{ username: "John", email: "john@gmail.com", id: 1 }, { username: "Jane", email: "jane@gmail.com", id: 2 }]
    fetchUsers() {
        return this.users
    }

    createUser(userData: CreateUserType) {
        this?.users?.push(userData);
        return { message: "User created", userData }
    }

    getUserById(id: number) {
        const foundUser = this?.users?.find((user) => user?.id === id);
        if (!foundUser) {
            throw new NotFoundException("User not found", HttpStatus?.NOT_FOUND?.toString());
        }
        return foundUser;
    }
}