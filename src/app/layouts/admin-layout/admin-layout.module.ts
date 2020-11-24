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

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { LinksUteisComponent } from '../../pages/links-uteis/linksuteis.component';
import { MarcasComponent } from '../../pages/marcas/marcas.component';
import { OperadorasComponent } from '../../pages/operadoras/operadoras.component';
import { UnidadesComponent } from '../../pages/unidades/unidades.component';
import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';
import { UsuarioEditComponent } from '../../pages/usuarios/usuarioEdit/usuarioEdit.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TituloComponent } from '../../pages/shared/titulo/titulo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    ModalModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    LinksUteisComponent,
    MarcasComponent,
    OperadorasComponent,
    UnidadesComponent,
    UsuariosComponent,
    UsuarioEditComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    TituloComponent
  ]
})

export class AdminLayoutModule {}
