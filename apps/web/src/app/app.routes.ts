import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { NationListComponent } from './features/nations/nation-list/nation-list';
import { NationDetailComponent } from './features/nations/nation-detail/nation-detail';

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
];
