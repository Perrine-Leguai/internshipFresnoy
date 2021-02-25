//services
import {ResearchComponent} from './research/research.component'
import {DisplayedInfoComponent} from './displayed-info/displayed-info.component'
import { ConnectionComponent } from './connection/connection.component'

//modules
import { RouterModule, Routes, ActivatedRoute, ParamMap } from '@angular/router'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './_errorPage/page-not-found/page-not-found.component'
import { AppComponent } from './app.component'


const ROUTES : Routes=[
  {path:"", component: AppComponent},
  {path : "login", component : ConnectionComponent},
  {path:":type/:id", component: DisplayedInfoComponent},
  {path:"404", component: PageNotFoundComponent},
  {path :"**", redirectTo:'/404'}
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports : [RouterModule]
})

export class AppRoutingModule{

}
