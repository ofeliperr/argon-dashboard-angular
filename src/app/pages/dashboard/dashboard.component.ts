import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartExamplePie
} from '../../variables/charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    // const chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    // const ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    const chartSales = document.getElementById('chart-sales') as HTMLCanvasElement;

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });

    const chartAprovadas = document.getElementById('chart-aprovadas') as HTMLCanvasElement;

    this.salesChart = new Chart(chartAprovadas, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });

    const chartNegativas = document.getElementById('chart-negativas') as HTMLCanvasElement;

    this.salesChart = new Chart(chartNegativas, {
      type: 'pie',
      options: chartExamplePie.options,
      data: chartExamplePie.data
      // ,
      // colors:  {
      //   backgroundColor: [
      //     'red',
      //     'green',
      //     'blue',
      //     'yellow',
      //   ]
      // }
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
