import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly imageRepo: Repository<ProductImage>,
  ) { }

  findAll() {
    return this.productRepo.find({
      relations: ['images'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(dto: CreateProductDto, files?: Express.Multer.File[]) {
    const product = this.productRepo.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      available: dto.available ?? true,
      stock: dto.stock ?? 0,
    });

    await this.productRepo.save(product);

    if (files?.length) {
      const imgs = files.map((file) =>
        this.imageRepo.create({
          url: `/uploads/${file.filename}`,
          product,
        }),
      );
      await this.imageRepo.save(imgs);
    }

    return this.findOne(product.id);
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.productRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.productRepo.delete(id);
    return { success: true };
  }
}
