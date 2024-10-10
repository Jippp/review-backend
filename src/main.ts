import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module';
import { PORT, STATICPATH } from './config'
import { HttpExceptionFilter } from './interceptor/http-exception.filter'
import { ResponseInterceptor } from './interceptor/response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  // 开启静态资源访问
  app.useStaticAssets(STATICPATH, {
    prefix: `/${STATICPATH}`
  })

  // 拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())
  // 过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(PORT);
  console.log(`Server is running http://localhost:${PORT}`)
}
bootstrap();
