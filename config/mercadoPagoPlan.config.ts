import MercadoPagoConfig from "mercadopago";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' })

export const client = new MercadoPagoConfig({
    accessToken: process.env.YOUR_ACCESS_TOKEN_PLAN
    });