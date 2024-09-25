import { ApplicationRef, DoBootstrap, Injector, NgModule } from "@angular/core";
import { PasswordValidatorComponent } from "./password-validator/password-validator.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { appConfig } from "./app.config";
import { createCustomElement } from "@angular/elements";
import { AppComponent } from "./app.component";

/**
 * The root module for the password validation application. It configures the components, services, 
 * and Angular modules required to bootstrap the application and defines a custom web component.
 */
@NgModule({
    imports: [BrowserModule, CommonModule, PasswordValidatorComponent],
    providers: appConfig.providers
  })
export class AppModule implements DoBootstrap {
    constructor (private readonly injector: Injector){}
    
    ngDoBootstrap(): void {
        const elementName = 'password-validator-element';
        if (!customElements.get(elementName)) {
          const PasswordValidatorElement = createCustomElement(AppComponent, { injector: this.injector });
          customElements.define(elementName, PasswordValidatorElement);
        }
    }
}
