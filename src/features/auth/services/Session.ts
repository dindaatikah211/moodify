import { auth } from "./Auth";

export const getSession = (request: Request) => auth.api.getSession({ headers: request.headers });