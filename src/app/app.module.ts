import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AuthInterceptor } from "./_interceptor/auth/auth.interceptor";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { HeaderComponent } from "./header/header.component";
import { CardComponent } from "./card/card.component";
import { LoginComponent } from "./login/login.component";
import { BackButtonDirective } from "./back-button.directive";
import { SignupComponent } from "./signup/signup.component";
import { GameFilterPipe } from "./game-filter.pipe";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { AdminComponent } from "./admin/admin.component";
import { AddOrModifyGameComponent } from "./add-or-modify-game/add-or-modify-game.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        HeaderComponent,
        CardComponent,
        LoginComponent,
        BackButtonDirective,
        SignupComponent,
        GameFilterPipe,
        CartComponent,
        CheckoutComponent,
        AdminComponent,
        AddOrModifyGameComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule,
        MatCardModule,
        MatTableModule,
        MatDialogModule,
        MatFormFieldModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
