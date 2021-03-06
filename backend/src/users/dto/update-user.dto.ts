import { Type } from "class-transformer";
import { IsDate, IsEmail, IsLatitude, IsLongitude, IsNumberString, IsOptional, Length } from "class-validator";
import { Tag } from "src/entities/job/tag.entity";
import { Double } from "typeorm";

export class updateUser{
    @IsOptional()
    id: number;

    @IsOptional()
    password: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    prefix: string;

    @IsOptional()
    firstname: string;
    
    @IsOptional()
    lastname: string;

    @IsOptional()
    @Type(()=>Date)
    @IsDate()
    birthDate: Date;

    @IsOptional()
    address: string;

    @IsOptional()
    @IsLatitude()
    latitude: Double;

    @IsOptional()
    @IsLongitude()
    longtitude: Double;

    @IsOptional()
    @IsNumberString()
    @Length(10)
    telNumber: string;
    
    @IsOptional()
    avatarFileId: number;

    @IsOptional()
    tags: string[];

    @IsOptional()
    province: string;

    @IsOptional()
    isAdmin: boolean;
}