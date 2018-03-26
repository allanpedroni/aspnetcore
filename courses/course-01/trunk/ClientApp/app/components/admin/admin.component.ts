import { Component } from '@angular/core';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }
}
