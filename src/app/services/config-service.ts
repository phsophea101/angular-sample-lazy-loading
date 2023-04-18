import { HttpParams } from "@angular/common/http";

export interface ConfigService {
    get<T>(path: String, params?: HttpParams, loading?: boolean): Promise<T>;
    info(msg: any): void;
    error(msg: any): void;
    warn(msg: any): void;
}