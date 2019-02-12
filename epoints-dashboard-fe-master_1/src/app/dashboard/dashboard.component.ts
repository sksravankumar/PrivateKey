import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxChartComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxchart";
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AlertService, ReportService } from '../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(
    private alertService: AlertService,
    private reportService: ReportService,
    private router: Router,
   ) { }

  /* get total and percentage of active and inactive products */
  productData;
  productSeriesGroups;
  getTotalProducts() {
    this.reportService.getTotalProducts()
    .pipe(first())
    .subscribe(
      data => {
        this.productData = [
          { name: 'Active Product', Percent: data.message.active_percentage, Total: data.message.active },
          { name: 'Inactive Product', Percent: data.message.inactive_percentage, Total: data.message.inactive }
         ];
      },
      error => {
        this.alertService.error(error);
      });

    this.productSeriesGroups = [{
      type: "pie",
      showLabels: true,
      click: this.myActiveEventHandler.bind(this), // here, we need to bind this with the eventhandler because the eventhandler says this as undefined if you do not bind it.
      series:
      [
        {
          dataField: 'Percent',
          displayText: 'name',
          labelRadius: 170,
          initialAngle: 15,
          radius: 145,
          centerOffset: 0,
          formatFunction: (value: any) => {
            if (isNaN(value))
              return value;
            return parseFloat(value) + '%';
          },
          toolTipFormatFunction: (value, itemIndex) => {
            let percentage,
              eachProduct = this.productData[itemIndex],
              result = '<strong>' + eachProduct.name + '</strong><br>';
            if (isNaN(value))
              percentage = value;
            percentage = parseFloat(value) + '%';

            result += eachProduct.Total + '<br>' + percentage;
            return result;
          }
        }
      ]
    }]
  }

  myActiveEventHandler(e) {
    if(e.elementIndex === 0) {
      this.router.navigate(['/home/active-products']);
    } else {
      return false;
    }
  };

  /* get trend values of last 30 days for active and inactive products */
  trendData;
  trendXAxis;
  trendValueAxis;
  trendSeriesGroups;
  getTrends() {
    this.reportService.getTrends()
    .pipe(first())
    .subscribe(
      data => {
        const sampleData = [];
        for (var i = 0; i < data.outputs.active.length; i++) {
          const eachData = {
            Day: i+1, active: data.outputs.active[i], inactive: data.outputs.inactive[i]
          }
          sampleData.push(eachData);
        }
        this.trendData = sampleData;
      },
      error => {
        this.alertService.error(error);
      });

    this.trendXAxis = {
      dataField: 'Day',
      title: { text: 'Last 30 Days' }
    };
    this.trendValueAxis =
    {
      // unitInterval: 5,
      minValue: 0,
      // maxValue: 55,
      labels: { horizontalAlignment: 'right' },
      title: { text: 'Totals<br>' }
    };

    this.trendSeriesGroups = [{
      type: "line",
      showLabels: true,
      series:
      [
        { dataField: 'active', displayText: 'Active' },
        { dataField: 'inactive', displayText: 'Inactive' }
      ]
    }]
  }

  /* get last updated retailers */
  lastUpdatedData;
  getLastUpdated() {
    this.reportService.getLastUpdated()
    .pipe(first())
    .subscribe(
      data => {
        data.outputs.forEach(eachOpt => {
          let date = new Date(eachOpt.date);
          let nowDate = new Date();
          var todayDateOnly = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate()); //This will write a Date with time set to 00:00:00 so you kind of have date only
          var dDateOnly = new Date(date.getFullYear(),date.getMonth(),date.getDate());
          eachOpt.highlight = false;
          if (dDateOnly < todayDateOnly) {
            // console.log('date is not equal to now date');
            eachOpt.highlight = true;
          }
        });
        this.lastUpdatedData = data.outputs;
      },
      error => {
        this.alertService.error(error);
      });
  }

  /* get debug count for last 30 days */
  debugData;
  debugXAxis;
  debugValueAxis;
  debugSeriesGroups;
  getDebugCounts() {
    this.reportService.getDebugCount()
    .pipe(first())
    .subscribe(
      data => {
        const sampleData = [];
        for (var i = 0; i < data.outputs.count.length; i++) {
          const eachData = {
            Day: i+1, count: data.outputs.count[i]
          }
          sampleData.push(eachData);
        }
        this.debugData = sampleData;
      },
      error => {
        this.alertService.error(error);
      });

    this.debugXAxis = {
      dataField: 'Day',
      title: { text: 'Last 30 Days' }
    };
    this.debugValueAxis =
    {
      // unitInterval: 5,
      minValue: 0,
      // maxValue: 55,
      labels: { horizontalAlignment: 'right' },
      title: { text: 'Totals<br>' }
    };

    this.debugSeriesGroups = [{
      type: "line",
      showLabels: true,
      series:
      [
        { dataField: 'count', displayText: 'Debug Count' }
      ]
    }]
  }

  ngOnInit() {
    this.getTotalProducts();
    this.getLastUpdated();
    this.getTrends();
    this.getDebugCounts();
  }

}
