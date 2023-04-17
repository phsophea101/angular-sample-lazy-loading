import { ResponseModel } from "./response-model.interface";

export interface QuoteModel extends ResponseModel<QuoteModel> {
    quotes: string[];
  }