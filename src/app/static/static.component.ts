import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {


  myControl = new FormControl();
 
   plansponsors: string[] = ['0035045', '0038423', '0035015'];
  filteredOptions: Observable<string[]>;
  constructor() {
   // this.loadplansponsors();
  }
  //build list of states as map of key-value pairs
  //loadplansponsors() {
  //  var allplanspons = '0035045, 0038423';
  //  this.plansponsors = allplanspons.split(/, +/g).map(function (plansponsor) {
  //    return {
  //      value: plansponsor.toUpperCase(),
  //      display: plansponsor
  //    };
  //  });
  //}

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
}
