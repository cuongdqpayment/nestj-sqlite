import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { VercelRequest, VercelResponse } from '@vercel/node'; // Cần cài đặt @vercel/node

// NestJS cần được bọc trong một hàm serverless
let app: INestApplication;

export default async function (req: VercelRequest, res: VercelResponse) {
    if (!app) {
        app = await NestFactory.create(AppModule, { bodyParser: false });
        app.enableCors(); // Tùy chọn: Bật CORS
        await app.init();
    }
    // Đây là cách NestJS sẽ xử lý request trong môi trường serverless của Vercel
    // Import @vercel/node để sử dụng createVercelLambda
    // Cần cài đặt: npm install @vercel/node
    const server = app.getHttpAdapter().getInstance();
    await server(req, res);
}