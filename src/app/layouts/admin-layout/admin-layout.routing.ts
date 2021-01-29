import { Routes } from '@angular/router';

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
import { AuthGuard } from '../../auth/auth-guard.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',             component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'links-uteis',              component: LinksUteisComponent, canActivate: [AuthGuard] },
    { path: 'links-uteis/:id/edit',     component: LinksUteisEditComponent, canActivate: [AuthGuard] },
    { path: 'marcas',                   component: MarcasComponent, canActivate: [AuthGuard]  },
    { path: 'marcas/:id/edit',          component: MarcasEditComponent, canActivate: [AuthGuard] },
    { path: 'operadoras',               component: OperadorasComponent, canActivate: [AuthGuard] },
    { path: 'operadoras/:id/edit',      component: OperadoraEditComponent, canActivate: [AuthGuard] },
    { path: 'unidades',                 component: UnidadesComponent, canActivate: [AuthGuard] },
    { path: 'unidades/:id/edit',        component: UnidadesEditComponent, canActivate: [AuthGuard] },
    { path: 'usuarios',                 component: UsuariosComponent, canActivate: [AuthGuard] },
    { path: 'usuario/:id/edit',         component: UsuarioEditComponent, canActivate: [AuthGuard] },
    { path: 'pesquisacip',              component: PesquisaCipComponent, canActivate: [AuthGuard] },
    { path: 'pesquisacip/:id/edit',     component: PesquisaCipEditComponent, canActivate: [AuthGuard] },
    { path: 'tables',                   component: TablesComponent, canActivate: [AuthGuard] },
    { path: 'icons',                    component: IconsComponent, canActivate: [AuthGuard] },
    { path: 'maps',                     component: MapsComponent, canActivate: [AuthGuard] }
];
