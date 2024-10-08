import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module';
import { PORT, STATICPATH } from './config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  // 开启静态资源访问
  app.useStaticAssets(STATICPATH, {
    prefix: `/${STATICPATH}`
  })
  await app.listen(PORT);
  console.log(`Server is running http://localhost:${PORT}`)
}
bootstrap();
