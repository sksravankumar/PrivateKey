import { Component, OnInit } from '@angular/core';
import { jqxChartComponent } from "jqwidgets-scripts/jqwidgets-ts/angular_jqxchart";
import { first } from 'rxjs/operators';

import { AlertService, ReportService } from '../../services';

@Component({
  selector: 'app-active-product',
  templateUrl: './active-product.component.html',
  styleUrls: ['./active-product.component.css']
})
export class ActiveProductComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private reportService: ReportService
  ) { }

  departmentsData;
  retailersData;
  rangeData;
  departmentSeriesGroup;
  retailerSeriesGroup;
  rangeSeriesGroup;
  getActiveProducts() {
    this.reportService.getActiveProducts()
    .pipe(first())
    .subscribe(
      data => {
        this.departmentsData = data.departments;
        this.retailersData = data.retailers;
        this.rangeData = data.range_counts;
      },
      error => {
        this.alertService.error(error);
      });

    /* pie chart for department */
    this.departmentSeriesGroup = [{
      type: "pie",
      showLabels: true,
      series:
      [
        {
          dataField: 'percentage',
          displayText: 'department',
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
              eachDepartment = this.departmentsData[itemIndex],
              result = '<strong>' + eachDepartment.department + '</strong><br>';
            if (isNaN(value))
              percentage = value;
            percentage = parseFloat(value) + '%';

            result += eachDepartment.count + '<br>' + percentage;
            return result;
          }
        }
      ]
    }]

    /* pie chart for retailer */
    this.retailerSeriesGroup = [{
      type: "pie",
      showLabels: true,
      series:
      [
        {
          dataField: 'percentage',
          displayText: 'retailer',
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
              eachRetailer = this.retailersData[itemIndex],
              result = '<strong>' + eachRetailer.retailer + '</strong><br>';
            if (isNaN(value))
              percentage = value;
            percentage = parseFloat(value) + '%';

            result += eachRetailer.count + '<br>' + percentage;
            return result;
          }
        }
      ]
    }]

    /* pie chart for points range */
    this.rangeSeriesGroup = [{
      type: "pie",
      showLabels: true,
      series:
      [
        {
          dataField: 'percentage',
          displayText: 'count_range',
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
              eachRange = this.rangeData[itemIndex],
              result = '<strong>' + eachRange.count_range + '</strong><br>';
            if (isNaN(value))
              percentage = value;
            percentage = parseFloat(value) + '%';

            result += eachRange.count + '<br>' + percentage;
            return result;
          }
        }
      ]
    }]
  }

  ngOnInit() {
    this.getActiveProducts();
  }OnInit() {
  }

}
