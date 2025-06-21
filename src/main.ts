import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The TrustPay Platform')
    .setDescription('The TrustPay Platform API description')
    .setVersion('1.0')
    .addSecurityRequirements('bearer', ['bearer'])
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is successfully started on port: ${process.env.PORT}`);
}

bootstrap();
