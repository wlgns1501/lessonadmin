import { Category } from 'src/entities/category.entity';
import { SubCategory } from 'src/entities/sub_category.entity';
import { CreateSubCategoryDto } from 'src/sub_category/dtos/createSubCategory.dto';
import { UpdateSubCategoryDto } from 'src/sub_category/dtos/updateSubCategory.dto';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(SubCategory)
export class SubCategoryRepository extends BaseRepository<SubCategory> {
  async getSubCategories() {
    return await this.createQueryBuilder('sub_category').getMany();
  }

  async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    const { name, categoryId } = createSubCategoryDto;

    return await this.createQueryBuilder('sub_category')
      .insert()
      .into('sub_category')
      .values({ name, categoryId })
      .returning('*')
      .execute();
  }

  async getSubCategory(subCategoryId: number) {
    return await this.createQueryBuilder('sub_category')
      .where({
        id: subCategoryId,
      })
      .getOne();
  }

  async updateSubCategory(
    subCategoryId: number,
    name: string,
    category: Category,
  ) {
    return await this.createQueryBuilder()
      .update(SubCategory)
      .set({ name, category })
      .where({ id: subCategoryId })
      .returning('*')
      .execute();
  }
}