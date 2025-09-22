import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { NationListComponent } from './features/nations/nation-list/nation-list';
import { NationDetailComponent } from './features/nations/nation-detail/nation-detail';
import { TeamListComponent } from './features/teams/team-list/team-list';
import { TeamDetailComponent } from './features/teams/team-detail/team-detail';
import { LeagueListComponent } from './features/leagues/league-list/league-list';
import { LeagueDetailComponent } from './features/leagues/league-detail/league-detail';
import { SeasonListComponent } from './features/seasons/season-list/season-list';
import { SeasonDetailComponent } from './features/seasons/season-detail/season-detail';

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
    {
        path: 'leagues',
        component: LeagueListComponent
    },
    {
        path: 'leagues/new',
        component: LeagueDetailComponent
    },
    {
        path: 'leagues/edit/:id',
        component: LeagueDetailComponent
    },
    {
        path: 'seasons',
        component: SeasonListComponent
    },
    {
        path: 'seasons/new',
        component: SeasonDetailComponent
    },
    {
        path: 'seasons/edit/:id',
        component: SeasonDetailComponent
    },
];
