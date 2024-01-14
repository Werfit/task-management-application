import axios from "axios";
import { env } from "../common/env/env.ts";

const server = axios.create({
  baseURL: env.server.baseUrl,
});

export { server as axios };
