import {
  forwardRef,
  Module
} from '@nestjs/common'
import { AppModule } from 'src/app.module'
import { NewsLettersService } from './news_letters.service';
import { NewsLettersController } from './news_letters.controller';

@Module({
  imports: [forwardRef(()=>AppModule) ],
  controllers: [NewsLettersController],
  providers: [NewsLettersService],
})
export class NewsLettersModule {}
