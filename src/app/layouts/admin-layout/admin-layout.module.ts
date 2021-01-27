import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';
// import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from 'ngx-clipboard';
import { ChartsModule } from 'ng2-charts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { LinksUteisComponent } from '../../pages/links-uteis/linksuteis.component';
import { LinksUteisEditComponent } from '../../pages/links-uteis/links-uteisEdit/links-uteisEdit.component';
import { MarcasComponent } from '../../pages/marcas/marcas.component';
import { MarcasEditComponent } from '../../pages/marcas/marcasEdit/marcasEdit.component';
import { OperadorasComponent } from '../../pages/operadoras/operadoras.component';
import { OperadoraEditComponent } from '../../pages/operadoras/operadoraEdit/operadoraEdit.component';
import { UnidadesComponent } from '../../pages/unidades/unidades.component';
import { UnidadesEditComponent } from '../../pages/unidades/unidadesEdit/unidadesEdit.component';
import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';
import { UsuarioEditComponent } from '../../pages/usuarios/usuarioEdit/usuarioEdit.component';
import { PesquisaCipComponent } from '../../pages/pesquisa-cip/pesquisa-cip.component';
import { PesquisaCipEditComponent } from '../../pages/pesquisa-cip/pesquisa-cipEdit/pesquisa-cipEdit.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TituloComponent } from '../../pages/shared/titulo/titulo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgxPaginationModule,
    TabsModule.forRoot(),
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    LinksUteisComponent,
    LinksUteisEditComponent,
    MarcasComponent,
    MarcasEditComponent,
    OperadorasComponent,
    OperadoraEditComponent,
    UnidadesComponent,
    UnidadesEditComponent,
    UsuariosComponent,
    UsuarioEditComponent,
    PesquisaCipComponent,
    PesquisaCipEditComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    TituloComponent
  ]
})

export class AdminLayoutModule {}
