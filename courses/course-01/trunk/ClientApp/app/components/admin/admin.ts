import { Component } from '@angular/core';

@Component({
    template: `<h1>Admin</h1>
    <chart type="pie" [data]="data"></chart>
    `
    
}) //'./admin.html'
export class AdminComponent {
    data = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
            {
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ]
            }
        ]
    };
    // public currentCount = 0;

    // public incrementCounter() {
    //     this.currentCount++;
    // }
}
