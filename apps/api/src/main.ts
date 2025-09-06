import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('League Manager API')
        .setDescription('API documentation for the League Manager')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    // Swagger UI endpoint
    SwaggerModule.setup('swagger-ui', app, document);

    // Raw swagger.json endpoint
    app.use('swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(document);
    });
    

    app.enableCors({
        origin: 'http://localhost:4200', // or use '*' for all origins in dev
        credentials: true,
    });

    await app.listen(3000);
}

bootstrap();
