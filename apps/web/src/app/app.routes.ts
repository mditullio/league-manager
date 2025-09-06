import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { NationListComponent } from './features/nations/nation-list/nation-list';
import { NationDetailComponent } from './features/nations/nation-detail/nation-detail';
import { TeamListComponent } from './features/teams/team-list/team-list';
import { TeamDetailComponent } from './features/teams/team-detail/team-detail';

export const routes: Routes = [
    {
        path: 'nations',
        component: NationListComponent
    },
    {
        path: 'nations/new',
        component: NationDetailComponent
    },
    {
        path: 'nations/edit/:id',
        component: NationDetailComponent
    },
    {
        path: 'teams',
        component: TeamListComponent
    },
    {
        path: 'teams/new',
        component: TeamDetailComponent
    },
    {
        path: 'teams/edit/:id',
        component: TeamDetailComponent
    },
];
