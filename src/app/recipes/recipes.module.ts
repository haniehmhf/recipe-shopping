import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { FilterPipe } from "../pipes/filter.pipe";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeResolver } from "./recipes.resolver";
import { RecpieStarterComponent } from "./recpie-starter/recpie-starter.component";

const routes:Routes = [
    {
        path: '',
        component: RecipesComponent,
        resolve: [RecipeResolver],
        canActivate:[AuthGuard],
        children: [
          { path: '', component: RecpieStarterComponent },
          { path: 'new', component: RecipeEditComponent },
          { path: ':id', component: RecipeDetailComponent },
          { path: ':id/edit', component: RecipeEditComponent },
        ],
      },
]

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecpieStarterComponent,
        RecipeEditComponent,
        FilterPipe
    ],
    imports:[
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ],
})

export class RecipesModule {}