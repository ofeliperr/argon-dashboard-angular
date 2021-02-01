import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { Dashboard } from '../../_models/Dashboard';
import { Regional } from '../../_models/Regional';
import { Marca } from '../../_models/Marca';
import { Unidade } from '../../_models/Unidade';
import { Operadora } from '../../_models/Operadora';
import { DashFilter } from '../../_models/DashFilter';
import { DashboardService } from '../../_services/dashboard.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
defineLocale('pt-br', ptBrLocale);
registerLocaleData(localePt);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
})
export class DashboardComponent implements OnInit  {
  titulo = 'Dashboard';
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;
  registerForm: FormGroup;
  regionais: Regional[];
  marcas: Marca[] = [];
  marcasSelecionadas: Marca[] = [];
  unidades: Unidade[];
  operadoras: Operadora[] = [];
  operadorasSelecionadas: Operadora[] = [];
  dashboard: Dashboard;
  dashfilter: DashFilter;

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
  temposExibicao = ['5', '15', '30', '60'];
  temposPaginacao = ['15', '30', '60'];
  nrSelect = 47;
  timeLeft = 60;
  timeConf = 60;
  iContMarca = 0;
  interval;

  // GRAFICOS LINHAS
  lineChartData: ChartDataSets[] = [
    { data: [50, 100, 150, 100, 50, 100], label: 'Amil' },
  ];

  lineChartLabels: Label[] = ['14:01', '14:02', '14:03', '14:05', '14:06', '14:07'];

  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
              display: true,
              ticks: {
                  beginAtZero: true,
                  steps: 10,
                  stepValue: 5,
                  max: 100
              }
          }]
    },
  };

  lineChartOptions1 = {
    responsive: true,
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[0].data[tooltipItems.index] + ' %';
        }
      }
    },
    scales: {
      yAxes: [{
              display: true,
              ticks: {
                  beginAtZero: true,
                  steps: 10,
                  stepValue: 5,
                  max: 100
              }
          }]
    },
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
    private dashboardService: DashboardService
  , private fb: FormBuilder
  , private toastr: ToastrService
  , private localeService: BsLocaleService
  ) {
    localeService.use('pt-br');
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  dropdownList1 = [];
  selectedItems1 = [];
  dropdownSettings1: IDropdownSettings;
  dropdownSettings2: IDropdownSettings;
  dropdownSettings3: IDropdownSettings;

  ngOnInit() {
    this.validation();
    // this.getRegionais();
    this.getMarcas();
    this.getUnidades();
    this.getOperadoras();

    this.registerForm.patchValue({
      exibicao: '5',
      paginacao: '60',
      data: new Date(),
    });

    // formatDate(new Date(), 'dd/MM/yyyy', 'pt-BR')

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Selecionar Todas',
      unSelectAllText: 'Desselecionar Todas',
      searchPlaceholderText: 'Pesquisar',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.iContMarca = 0;
    this.getDashboard();
    this.startTimer();
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.getDashboard();
        this.timeLeft = this.timeConf;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  validation() {
    this.registerForm = this.fb.group({
      data: [''],
      exibicao: [''],
      regional: [''],
      marca: [''],
      unidade: [''],
      operadora: [''],
      paginacao: [''],
    });
  }

  novoFiltro(template: any) {
    this.openModal(template);
    // this.registerForm.reset();
  }

  openModal(template: any) {
    template.show();
    this.pauseTimer();
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  getRegionais() {
    this.dashboardService.getAllRegional().subscribe(
      (pax: Regional[]) => {
      this.regionais = pax;
      this.regionais.sort(function (obj1, obj2) {
        return obj1.regI_NOM_REGIONAL < obj2.regI_NOM_REGIONAL ? -1 :
        (obj1.regI_NOM_REGIONAL > obj2.regI_NOM_REGIONAL ? 1 : 0);
      });
    }, error => {
      this.toastr.error(`Erro ao tentar buscar regionais: ${error}!`);
    });
  }

  getMarcas() {
    this.dashboardService.getAllMarca().subscribe(
      (pax: Marca[]) => {
      this.marcas = pax;
      this.marcas.sort(function (obj1, obj2) {
        return obj1.marC_NOM_MARCA < obj2.marC_NOM_MARCA ? -1 :
        (obj1.marC_NOM_MARCA > obj2.marC_NOM_MARCA ? 1 : 0);
      });

      // this.dropdownList1 = this.marcas;
      this.selectedItems1 = [];
      this.dropdownSettings1 = {
        singleSelection: false,
        idField: 'marC_COD_MARCA',
        textField: 'marC_NOM_MARCA',
        selectAllText: 'Selecionar Todas',
        unSelectAllText: 'Desselecionar Todas',
        searchPlaceholderText: 'Pesquisar',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };

    }, error => {
      this.toastr.error(`Erro ao tentar buscar marcas: ${error}!`);
    });
  }

  getUnidades() {
    this.dashboardService.getAllUnidade().subscribe(
      (pax: Unidade[]) => {
      this.unidades = pax;
      this.unidades.sort(function (obj1, obj2) {
        return obj1.uniD_NOM_UNIDADE < obj2.uniD_NOM_UNIDADE ? -1 :
        (obj1.uniD_NOM_UNIDADE > obj2.uniD_NOM_UNIDADE ? 1 : 0);
      });

      this.dropdownSettings2 = {
        singleSelection: false,
        idField: 'uniD_COD_UNIDADE',
        textField: 'uniD_NOM_UNIDADE',
        selectAllText: 'Selecionar Todas',
        unSelectAllText: 'Desselecionar Todas',
        searchPlaceholderText: 'Pesquisar',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    }, error => {
      this.toastr.error(`Erro ao tentar buscar unidades: ${error}!`);
    });
  }

  getOperadoras() {
    this.dashboardService.getAllOperadora().subscribe(
      (pax: Operadora[]) => {
      this.operadoras = pax;
      this.operadoras.sort(function (obj1, obj2) {
        return obj1.opeR_NOM_OPERADORA < obj2.opeR_NOM_OPERADORA ? -1 :
        (obj1.opeR_NOM_OPERADORA > obj2.opeR_NOM_OPERADORA ? 1 : 0);
      });

      this.dropdownSettings3 = {
        singleSelection: false,
        idField: 'opeR_COD_OPERADORA',
        textField: 'opeR_NOM_OPERADORA',
        selectAllText: 'Selecionar Todas',
        unSelectAllText: 'Desselecionar Todas',
        searchPlaceholderText: 'Pesquisar',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    }, error => {
      this.toastr.error(`Erro ao tentar buscar operadoras: ${error}!`);
    });
  }

  getDashboard() {
    // console.log(this.registerForm.value);
    let iOperadora: number;
    let iMarca: number;
    let dataFiltro: string;
    let iPeriodo: string;

    console.log(this.marcas.length);
    // TIMER ENTRE MARCAS
    if (this.marcas.length > 0) {
      this.marcasSelecionadas = this.registerForm.get('marca').value;

      if (this.marcasSelecionadas.length <= 0) {
        if (this.iContMarca > (this.marcas.length - 1)) {
          this.iContMarca = 0;
        }
        iMarca = this.marcas[this.iContMarca].marC_COD_MARCA;
        this.iContMarca++;
      } else {
        if (this.iContMarca > (this.marcasSelecionadas.length - 1)) {
          this.iContMarca = 0;
        }
        iMarca = this.marcasSelecionadas[this.iContMarca].marC_COD_MARCA;
        this.iContMarca++;
      }
    } else {
      iMarca = 1;
    }
    iOperadora = 326305;

    // PERIODO EXIBICAO
    if (this.registerForm.get('data').value) {
      let d1: Date;
      let d2: Date;

      d1 = this.registerForm.get('data').value;
      d2 = new Date();
      const Difference_In_Time = d2.getTime() - d1.getTime();
      const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      if (Math.round(Difference_In_Days) > 1) {
        iPeriodo = '1440';
      } else {
        iPeriodo = this.registerForm.get('exibicao').value;
      }
      dataFiltro = formatDate(d1, 'yyyy-MM-dd', 'pt-BR');

    } else {
      dataFiltro = formatDate(new Date(), 'yyyy-MM-dd', 'pt-BR');
      iPeriodo = this.registerForm.get('exibicao').value;
    }

    this.dashfilter = {IdMarca: iMarca, IdUnidade: 1, IdOperadora: iOperadora, Data: dataFiltro, Periodo: iPeriodo};

    this.dashboardService.getDashboard(this.dashfilter).subscribe(
      (pax: Dashboard) => {

        // console.log(pax);
        this.dashboard = pax;

        // GRAFICOS LINHAS Intraday % Negativas
        this.lineChartLabels = this.dashboard.operadorasNegativas[0].dadosIntraday.map(function (obj1) {
          const date = new Date(obj1.data);
          return (date.getHours() + ':' + date.getMinutes()).toString();
        });

        this.lineChartData = [];

        const linha: ChartDataSets[] = [];
        let valores: Array<string> = [];

        for (let i = 0; i < this.dashboard.operadorasNegativas.length; i++) {
          valores = [];

          this.dashboard.operadorasNegativas[i].dadosIntraday.map(function (obj2) {
            valores.push(obj2.valor.toString());
          });

          const toNumbers = arr => arr.map(Number);
          const valoresGraf = toNumbers(valores);

          linha.push({data: valoresGraf, label: this.dashboard.operadorasNegativas[i].nome});
          // console.log(linha);
        }

        this.lineChartData = linha;

        // Intraday % Aprovadas
        this.lineChartLabelsAprovadas = this.dashboard.operadorasAprovadas[0].dadosIntraday.map(function (obj1) {
          const date = new Date(obj1.data);
          return (date.getHours() + ':' + date.getMinutes()).toString();
        });

        this.lineChartDataAprovadas = [];

        const linha2: ChartDataSets[] = [];
        let valores2: Array<string> = [];

        for (let i = 0; i < this.dashboard.operadorasAprovadas.length; i++) {
          valores2 = [];

          this.dashboard.operadorasAprovadas[i].dadosIntraday.map(function (obj2) {
            valores2.push(obj2.valor.toString());
          });

          const toNumbers = arr => arr.map(Number);
          const valoresGraf = toNumbers(valores2);

          linha2.push({data: valoresGraf, label: this.dashboard.operadorasAprovadas[i].nome});
          // console.log(linha);
        }

        this.lineChartDataAprovadas = linha2;

    }, error => {
      this.toastr.error(`Erro ao tentar buscar operadoras: ${error}!`);
    });
  }

  filtrarDashboad(template: any) {
    template.hide();
    this.timeConf = this.registerForm.get('paginacao').value;
    this.timeLeft = this.timeConf;
    this.iContMarca = 0;
    this.startTimer();
  }
}
