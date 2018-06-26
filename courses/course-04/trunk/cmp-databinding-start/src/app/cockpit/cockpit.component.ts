import { Properties } from '../properties';
import { Component, OnInit, Output, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<Properties>();
  @Output() blueprintCreated = new EventEmitter<Properties>();
  serverElements = [];
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  constructor() { }

  // ngOnChanges(): void { // called after a bound input property changes
  // }

  ngOnInit() { // called once the component is initialize
  }

  // ngDoCheck() { //called during every change detection run
  // }

  // ngAfterContentInit() { // called after content (ng-content) has been project into view
  // }

  // ngAfterContentChecked() { // called every time the project content has been checked
  // }

  // ngAfterViewInit() { // called after the component's view (and child views) has been initialized
  // }

  // ngAfterViewChecked() { // called every time the view (and child views) have been checked
  // }

  // ngOnDestroy(): void { // called once the component is about to be destroyed
  // }

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
    // this.serverElements.push({
    //   type: 'server',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
    // this.serverElements.push({
    //   type: 'blueprint',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
  }

}
