import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None // can be view in source code file
})
export class ServerElementComponent implements
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() element: { type: string, name: string, content: string };

  constructor() { }

  ngOnChanges(changes: SimpleChanges) { // called after a bound input property changes
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngOnInit() { // called once the component is initialize
    console.log('ngOnInit called');
  }

  ngDoCheck() { // called during every change detection run
    console.log('ngDoCheck called');
  }

  ngAfterContentInit() { // called after content (ng-content) has been project into view
    console.log('ngAfterContentInit called');
  }

  ngAfterContentChecked() { // called every time the project content has been checked
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit() { // called after the component's view (and child views) has been initialized
    console.log('ngAfterViewInit called');
  }

  ngAfterViewChecked() { // called every time the view (and child views) have been checked
    console.log('ngAfterViewChecked called');
  }

  ngOnDestroy(): void { // called once the component is about to be destroyed
    console.log('ngOnDestroy called');
  }

}
