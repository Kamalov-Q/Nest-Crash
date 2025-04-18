import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: "Username is required" })
    @MinLength(3, { message: "Username must be at least 3 characters long" })
    username: string;

    @IsEmail({}, { message: "Invalid email" })
    @IsNotEmpty({ message: "Email is required" })
    email: string;
}