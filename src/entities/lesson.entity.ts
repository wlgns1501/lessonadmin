import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { SubCategory } from './sub_category.entity';

@Entity({ name: 'lesson' })
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', comment: 'PK' })
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ name: 'name', comment: '레슨 명' })
  @ApiProperty({
    description: '레슨 명',
    required: true,
    example: '드리블 꿀팁 강의',
  })
  name: string;

  @Column({ name: 'content', comment: '수업 내용' })
  @ApiProperty({
    description: '수업 내용',
    required: true,
    example: '수업 내용 입니다.',
  })
  content: string;

  @Column({ name: 'userLimit', comment: '수업 최대 인원' })
  @ApiProperty({ description: '수업 최대 인원', required: true, example: 20 })
  userLimit: number;

  @Column({ name: 'startDate', comment: '수업 시작 시간' })
  @ApiProperty({
    description: '수업 시작 시간',
    required: true,
    example: Date.now(),
  })
  startDate: string;

  @Column({ name: 'endDate', comment: '수업 종료 시간' })
  @ApiProperty({
    description: '수업 종료 시간',
    required: true,
    example: Date.now(),
  })
  endDate: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.lessons)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.lessons)
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: SubCategory;
}
