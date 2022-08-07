import { HttpParams } from '@angular/common/http';

export class ApiHelper {
  static buildParams(params: any): HttpParams | undefined {
    let req = new HttpParams();

    if (!params) {
      return req;
    }

    for (const k in params) {
      if (params[k]) {
        req = req.set(k, params[k]);
      }
    }
    return req;
  }
}
