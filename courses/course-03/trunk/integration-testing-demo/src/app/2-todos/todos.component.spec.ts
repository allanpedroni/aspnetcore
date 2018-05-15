/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/from';
import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not 
// provided the TodoService as a dependency to TodosComponent. 
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below. 

xdescribe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule],
      declarations: [ TodosComponent ],
      providers: [ TodoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos from the server-async', async(() => {
     let service = TestBed.get(TodoService); // return dependencies that are registered at the module level
    // fixture.debugElement.injector.get(TodoService)
    // spyOn(service, 'getTodos').and.returnValue(Observable.from([1, 2, 3]));
    spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([1, 2, 3]));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.todos.length).toBe(3);
    });
  }));
  it('should load todos from the server-fakeAsync', fakeAsync(() => {
     let service = TestBed.get(TodoService); // return dependencies that are registered at the module level
    // fixture.debugElement.injector.get(TodoService)
    // spyOn(service, 'getTodos').and.returnValue(Observable.from([1, 2, 3]));
    spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([1, 2, 3]));

    fixture.detectChanges();
    tick();
    expect(component.todos.length).toBe(3);
  }));
});
