import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SearchProductService } from './search-product.service'

@ApiTags('products')
@Controller('products')
export class SearchProductController {
  constructor(private readonly searchProductService: SearchProductService) {}
}
