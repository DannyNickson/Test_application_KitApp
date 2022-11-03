import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Test application')
    .setDescription('REST API DOCUMENTATION')
    .setVersion("1.0.0")
    .addTag("KitApp_Global")
    .build()

    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('/api/documentation',app,document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
