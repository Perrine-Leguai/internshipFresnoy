//components
import {DisplayedInfoComponent} from './displayed-info/displayed-info.component'
import { ConnectionComponent } from './connection/connection.component'
import { PageNotFoundComponent } from './_errorPage/page-not-found/page-not-found.component'
import { AppComponent } from './app.component'


//modules
import { RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router'
import { NgModule } from '@angular/core'


const ROUTES : Routes=[
  {path: "home", component: AppComponent},
  {path: ":type/:id", component: DisplayedInfoComponent},
  {path: "login", component : ConnectionComponent},
  {path: "404", component: PageNotFoundComponent},
  {path: "**", redirectTo:'/404'}
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports : [RouterModule]
})

export class AppRoutingModule{

}
