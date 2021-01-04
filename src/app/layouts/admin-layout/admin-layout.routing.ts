import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { LinksUteisComponent } from '../../pages/links-uteis/linksuteis.component';
import { LinksUteisEditComponent } from '../../pages/links-uteis/links-uteisEdit/links-uteisEdit.component';
import { MarcasComponent } from '../../pages/marcas/marcas.component';
import { OperadorasComponent } from '../../pages/operadoras/operadoras.component';
import { UnidadesComponent } from '../../pages/unidades/unidades.component';
import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';
import { UsuarioEditComponent } from '../../pages/usuarios/usuarioEdit/usuarioEdit.component';
import { PesquisaCipComponent } from '../../pages/pesquisa-cip/pesquisa-cip.component';
import { PesquisaCipEditComponent } from '../../pages/pesquisa-cip/pesquisa-cipEdit/pesquisa-cipEdit.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                component: DashboardComponent },
    { path: 'user-profile',             component: UserProfileComponent },
    { path: 'links-uteis',              component: LinksUteisComponent },
    { path: 'links-uteis/:id/edit',     component: LinksUteisEditComponent},
    { path: 'marcas',                   component: MarcasComponent },
    { path: 'operadoras',               component: OperadorasComponent },
    { path: 'unidades',                 component: UnidadesComponent },
    { path: 'usuarios',                 component: UsuariosComponent },
    { path: 'usuario/:id/edit',         component: UsuarioEditComponent},
    { path: 'pesquisacip',              component: PesquisaCipComponent },
    { path: 'pesquisacip/:id/edit',     component: PesquisaCipEditComponent },
    { path: 'tables',                   component: TablesComponent },
    { path: 'icons',                    component: IconsComponent },
    { path: 'maps',                     component: MapsComponent }
];
