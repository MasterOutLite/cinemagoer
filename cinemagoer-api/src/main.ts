import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@src/pipes/ValidationPipe";

async function bootstrap() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api');

    const configSwagger = new DocumentBuilder()
        .setTitle('Cinemagoer')
        .setDescription('Swagger Rest API')
        .setVersion('1.0.0')
        .build();

    const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api/docs', app, documentSwagger);

    await app.listen(PORT, () => {
        console.log(`Server start work on port: ${PORT}`);
    });

}

bootstrap();
