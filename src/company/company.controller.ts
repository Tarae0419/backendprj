import { CompanyService } from './company.service';
import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindListAndCountCompanyDto } from './dtos/find-list-and-count-company.dto';

@Controller('companies')
@ApiTags('공지사항')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({
    summary: '회사 리스트 조회',
  })
  @Get('')
  async getListAndCountBoardByQuery(
    @Query() queryDto: FindListAndCountCompanyDto,
  ) {
    return await this.companyService.findListAndCountCompany(queryDto);
  }

  @ApiOperation({
    summary: '회사 단일 조회',
  })
  @Get(':id')
  async getOneCompany(@Param('id') id: number) {
    return await this.companyService.findOneCompany(id);
  }
}
