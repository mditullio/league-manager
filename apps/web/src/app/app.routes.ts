import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { NationListComponent } from './features/nations/nation-list/nation-list';

export const routes: Routes = [
    {
        path: 'nations',
        component: NationListComponent
    },
];
