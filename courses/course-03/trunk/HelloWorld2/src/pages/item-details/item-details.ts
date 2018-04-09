import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'item-details.html'
})
export class ItemDetailsPage {

    item: any;

    constructor(
        navParams: NavParams,
        private viewCtrl: ViewController) {

        this.item = navParams.get('item');
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    done() {
        this.viewCtrl.dismiss();
    }
}