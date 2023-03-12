import { environment } from "src/environments/environment";

export const production = environment.PRODUCTION;
export default class log {
    static info(msg: any) { if (!production) console.info(msg); }
    static log(msg: any) { if (!production) console.log(msg); }
    static error(msg: any) { if (!production) console.error(msg); }
    static warn(msg: any) { if (!production) console.warn(msg); }
}