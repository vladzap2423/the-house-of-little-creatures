import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsBoolean()
    @IsOptional()
    available?: boolean;

    @IsNumber()
    @IsOptional()
    stock?: number;
}
