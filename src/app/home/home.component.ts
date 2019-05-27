import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data-share.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userData: any;
  public sidePanelSelection: number = 0;

  constructor(public _dataService: DataService) {
    this.userData = _dataService.getJSON();
  }

  ngOnInit() {
  }

}
