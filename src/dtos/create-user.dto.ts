import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: "Id is required" })
    @IsNumber({}, { message: "Id must be a number" })
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty({ message: "Username is required" })
    @MinLength(3, { message: "Username must be at least 3 characters long" })
    username: string;

    @IsEmail({}, { message: "Invalid email" })
    @IsNotEmpty({ message: "Email is required" })
    email: string;

    @IsNotEmpty({ message: "Age is required" })
    @IsNumber({}, { message: "Age must be a number" })
    age: number;
}