import { Component, VERSION } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    public name: string;

    constructor() {
        this.name = `Angular! v${VERSION.full}`
    }
}
