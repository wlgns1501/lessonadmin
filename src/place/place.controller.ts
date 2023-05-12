import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlaceService } from './place.service';
import { GetPlacesPipe } from './dtos/get_places.pipe';
import { GetPlacesDto } from './dtos/get_places.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('place')
@Controller('place')
export class PlaceController {
  constructor(private service: PlaceService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '장소 리스트' })
  @UseGuards(AdminGuard)
  getPlaces(@Query(new GetPlacesPipe()) getPlacesDto: GetPlacesDto) {
    return this.service.getPlaces(getPlacesDto);
  }
}
