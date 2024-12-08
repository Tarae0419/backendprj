import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { FindListAndCountCompanyDto } from './dtos/find-list-and-count-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findListAndCountCompany(queryDto: FindListAndCountCompanyDto) {
    const where = { name: undefined, content: undefined };
    const { name, content } = queryDto;
    if (name) {
      where.name = name;
    }
    if (content) {
      where.content = content;
    }

    return await this.companyRepository.findAndCount({ where });
  }

  async findOneCompany(id: number) {
    return await this.companyRepository.findOne({ where: { id } });
  }
}
