import {  IsString,  IsStrongPassword, IsEmail, Matches } from "class-validator";

export class AddUserDTO {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsEmail()
  username: string;
  age:string;
  rule:string;
  phone_number:string;
  year_subscribe:string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}

export class UpdPsswdDTO {
  oldPassword:string;
  @IsString()
  @IsStrongPassword({
    minLength: 8,
  })
  newPassword: string;
}

export class ConfirmUserDTO {
  @IsEmail()
  username: string;
}


