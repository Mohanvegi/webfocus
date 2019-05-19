import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { saveAs } from 'file-saver';
import * as $ from "jquery";


@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {


  myControl = new FormControl();
 
   plansponsors: any[] = [];
  filteredOptions: Observable<string[]>;
  url: string;
  constructor(private sharedsevice: SharedService, private httpClient: HttpClient) {
    
    this.loadplansponsors();
  }
  //build list of states as map of key-value pairs
  loadplansponsors() {
    this.sharedsevice.getSearchData('').then(data => {
      this.plansponsors = data;
    // alert(data);
    });
  }

  ngOnInit() {
    
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.plansponsors.filter(plansponsor => plansponsor.toLowerCase().includes(filterValue));
  }

  download() {
    return this.httpClient.get(`https://devwfrpsalt.nwie.net/ibi_apps_rps/rs/ibfs/WFC/Repository/Momentum/Common/fex/PLANS_JSON.fex?IBIRS_path=%2FWFC%2FRepository%2FMomentum%2FCommon%2Ffex%2FPLANS_JSON.fex&IBIRS_action=run&IBIRS_clientPath=__null&IBIRS_htmlPath=__null&IBIRS_userName=__null&IBIRS_password=__null&IBIRS_args=__null&IBIRS_random=20647`, {responseType: 'blob'});
   }

  private generateReport(){
    this.download().subscribe(res => { 
      saveAs(res, 'YourFileName.xlsx', 
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
 
 })

    // let headers = new Headers();
    //   this.url ='https://devwfrpsalt.nwie.net/ibi_apps_rps/rs/ibfs/WFC/Repository/Momentum/Common/fex/PLANS_JSON.fex?IBIRS_path=%2FWFC%2FRepository%2FMomentum%2FCommon%2Ffex%2FPLANS_JSON.fex&IBIRS_action=run&IBIRS_clientPath=__null&IBIRS_htmlPath=__null&IBIRS_userName=__null&IBIRS_password=__null&IBIRS_args=__null&IBIRS_random=20647';
    //    return this.httpClient.post( this.url ,body,{
    //     headers: headers,
    //     responseType: ResponseContentType.Blob
    // }).map(res => new Blob([res._body],{ type: 'application/vnd.ms-excel' }));
      //, body: any, options: {
      //   headers?: HttpHeaders | {
      //       [header: string]: string | string[];
      //   };


      // $.ajax({
           //   method: "POST",
       //   url: "https://devwfrpsalt.nwie.net/ibi_apps_rps/rs/ibfs/WFC/Repository/Momentum/Common/fex/PLANS_JSON.fex?IBIRS_path=%2FWFC%2FRepository%2FMomentum%2FCommon%2Ffex%2FPLANS_JSON.fex&IBIRS_action=run&IBIWF_SES_AUTH_TOKEN=c1518c8d238a5bbe80d74c1c1b23197a",
       //   contentType: "application/json; charset=utf-8"
       // })
      //alert("Report Generated")
     //return this.httpClient.post('https://devwfrpsalt.nwie.net/ibi_apps_rps/rs/ibfs/WFC/Repository/Momentum/Common/fex/PLANS_JSON.fex?IBIRS_path=%2FWFC%2FRepository%2FMomentum%2FCommon%2Ffex%2FPLANS_JSON.fex&IBIRS_action=run&IBIRS_clientPath=__null&IBIRS_htmlPath=__null&IBIRS_userName=__null&IBIRS_password=__null&IBIRS_args=__null&IBIRS_random=20647')

        // https://devwfrpsalt.nwie.net/ibi_apps_rps/rs/ibfs/WFC/Repository/Momentum/Common/fex/PLANS_JSON.fex?IBIRS_path=%2FWFC%2FRepository%2FMomentum%2FCommon%2Ffex%2FPLANS_JSON.fex&IBIRS_action=run&IBIRS_clientPath=__null&IBIRS_htmlPath=__null&IBIRS_userName=__null&IBIRS_password=__null&IBIRS_args=__null&IBIRS_random=20647
  }


  
}

// sendCreateReportRequest() {
//   this.showSpinner = true;
//   this.$http({
//     method: "POST",
//     url: "https://api-int-dev.nwie.net/ibi_apps_rps/WFServlet.ibfs",
//     overrideInterceptors: true,
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     data:
//       "IBFS1_action=RUNFEX&IBFS_path=/WFC/Repository/Momentum/Common/fex/create_new_inbox_entry_xml.fex&RPT_TYPE=Plan%20Asset%20Report&RPT_TITLE=Plan%20Asset%20Report&PLAN_NAME=ENTITY%20OF%20NATIONWIDE&PLAN_NUMS='0045564'&PLAN_NUM1='0045564'&OTH_PARMS=STATE:NV;STATE_TITLE:Nevada;OPT_PLAN:NAME;OPT_IRS:1;IRS_CODES:'FOC_NOSELECTION';IRS_CODES_TITLE:;OPT_DATE:1;ASOFDATE:3/28/2017;OPT_AGE:1;START_AGE:;END_AGE:;&BIP_random=0.3731350629895194&IBIWF_SES_AUTH_TOKEN=028b9199bd6f3162d49397eafbd168c2"
//   }).then(response => {
//     this.inboxId = response.data.split("<inboxid>")[1].split("</inboxid>")[0];
//     this.runReport(this.inboxId).then(response => {
//       this.panel = "display";
//       this.showSpinner = false;
//     });
//   });
// }

// runReport(inboxId) {
//   return this.$http({
//     method: "POST",
//     url: "https://api-int-dev.nwie.net/ibi_apps_rps/WFServlet.ibfs",
//     overrideInterceptors: true,
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     data: `IBFS1_action=runItemDeferred&IBFS_path=IBFS:/WFC/Repository/Momentum/Reports/Plan_Asset_Report/Plan_Asset_Report.fex&IBFS__methodName=runItemDeferred&IBIMR_defer_params=INBOX_ID,MODE&IBIMR_defer=defer&IBIF_gkeparam=INBOX_ID=${inboxId},MODE=RunOnce&INBOX_ID=${inboxId}&MODE=RunOnce&BIP_random=0.8380970559546173&IBIWF_SES_AUTH_TOKEN=b91d33ab3b67eb1f1d9c9ab5a7ec8d82`
//   });
// }