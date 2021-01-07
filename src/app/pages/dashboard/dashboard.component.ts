import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
// import * as Chart from 'chart.js';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  titulo = 'Dashboard';
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;
  registerForm: FormGroup;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Alocação Total'], ['Alocação Parcial'], 'Sem Alocação'];
  public pieChartData: SingleDataSet = [30, 50, 20];

  public pieChartLabelsNegativas: Label[] = [['Operadora 1'], ['Operadora 2'], 'Operadora 3'];
  public pieChartDataNegativas: SingleDataSet = [30, 50, 20];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // GRAFICOS LINHAS
  lineChartData: ChartDataSets[] = [
    { data: [50, 100, 150, 100, 50, 100], label: 'Amil' },
  ];

  lineChartLabels: Label[] = ['14:01', '14:02', '14:03', '14:05', '14:06', '14:07'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: '#fd625e',
      // backgroundColor: 'white',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  // GRAFICOS LINHAS - INTRADAY % APROVADAS
  lineChartDataAprovadas: ChartDataSets[] = [
    { data: [50, 100, 150, 100, 50, 100, 200, 150, 100, 200], label: 'Amil' },
    { data: [100, 200, 100, 100, 50, 200, 150, 50, 50, 100], label: 'Bradesco' },
    { data: [200, 100, 50, 150, 150, 200, 50, 100, 100, 50], label: 'Allianz' },
  ];

  lineChartLabelsAprovadas: Label[] = ['14:01', '14:02', '14:03', '14:05', '14:06', '14:07', '14:08', '14:09', '14:10', '14:11'];

  constructor(
    private fb: FormBuilder
  , private toastr: ToastrService
  , private localeService: BsLocaleService
  ) {
    localeService.use('pt-br');
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      data: [''],
      exibicao: [''],
      regional: [''],
      marca: [''],
      unidade: [''],
      operadora: ['']
    });
  }

  novoFiltro(template: any) {
    this.openModal(template);
    this.registerForm.reset();
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
