import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpErrorFilter } from 'src/common/controllerUtils/controllerHandling/httpErrorFilter';

@UseFilters(new HttpErrorFilter())
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello/:name')
  getHelloName(@Param('name') name: string): string {
    return this.appService.getHelloName(name);
  }

  @Get('testeException')
  testeException(): string {
    throw 'Teste';
    return '';
  }
}
