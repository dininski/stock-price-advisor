import "react-router";
import { createRequestHandler } from "@react-router/express";
import express, { Router } from "express";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const app = express();

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      };
    },
  }),
);


// TODO: to extract to separate file
const router = Router({strict: true});
router.post('/path', (req, res) => {

});