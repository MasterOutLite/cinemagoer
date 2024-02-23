import {NestFactory} from '@nestjs/core';
import {CommandModule, CommandService} from 'nestjs-command';
import {AppModule} from './app.module';

async function bootstrap() {
    console.log("Command start");

    const app = await NestFactory.createApplicationContext(AppModule, {
        logger: ["debug", "log", "warn", "error"]
    });

    console.log("Command start build");

    try {
        console.log("Command start app");
        await app
            .select(CommandModule)
            .get(CommandService)
            .exec();
        await app.close()
    } catch (error) {
        console.error(error);
        await app.close();
        process.exit(1);
    }
}

bootstrap();
