import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity({ name: 'sub_category' })
export class SubCategory extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', comment: 'PK' })
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ name: 'name', comment: '서브 카테고리 명', unique: true })
  @ApiProperty({ description: 'name', required: true, example: '드리블' })
  name: string;

  @CreateDateColumn({ name: 'createdAt' })
  @ApiProperty({ description: 'createdAt', readOnly: true })
  createdAt: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}

export class SubCategoryInfo extends PickType(SubCategory, ['name']) {}
