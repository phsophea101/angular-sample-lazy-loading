export interface ResponseModel<T> {
    body: T;
    result: Boolean;
    resultCode:String;
    resultMessage:String;
    traceId:String;
  }