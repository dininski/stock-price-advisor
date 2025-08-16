import "react-router";
import api from './routes'
import express, { Router } from "express";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

app.use('/api/v1/', api)