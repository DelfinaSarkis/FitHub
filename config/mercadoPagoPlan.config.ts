import MercadoPagoConfig from 'mercadopago';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const planClient = new MercadoPagoConfig({
  accessToken: process.env.YOUR_ACCESS_TOKEN_PLAN,
});
