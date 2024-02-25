import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from '@nestjs/common'
import {ValidationException} from "@src/exception/ValidationException";

async function bootstrap() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        exceptionFactory: errors => {
            if (errors.length) {
                let messages = errors.map(value => (
                    `${value.property}: ${value.value}. Type value ${typeof value.target}. ${value.contexts}.`
                ))
                throw new ValidationException(messages);
            }
        }
    }));

    app.setGlobalPrefix('api');
    app.enableCors();

    const configSwagger = new DocumentBuilder()
        .setTitle('Cinemagoer')
        .setDescription('Swagger Rest API')
        .setVersion('1.0.0')
        .addBearerAuth({
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT')
        .build();

    const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api/docs', app, documentSwagger);
    
    await app.listen(PORT, () => {
        console.log(`Server start work on port: ${PORT}`);
        console.log("Listen: ",{
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB
        })
    });
}

bootstrap();
