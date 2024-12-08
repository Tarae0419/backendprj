import { PartialType, PickType } from '@nestjs/swagger';
import { CompanyDto } from './company.dto';

export class FindListAndCountCompanyDto extends PartialType(
  PickType(CompanyDto, ['name', 'content'] as const),
) {}
