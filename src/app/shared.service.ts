import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class SharedService {
  constructor(    private httpClient: HttpClient  ) { }


  getSearchData(query: any) {
    return this.httpClient.get('assets/plans.json')
      .toPromise()
      .then(res => <any[]>res)
      .then(data => {
        let selectedPlans: any = [];
        for (let d of data['plans']) {
          selectedPlans.push(d.PLAN_NBR_NAME);         
        }
       // alert(selectedPlans);
        return selectedPlans;

      });
  }


}
