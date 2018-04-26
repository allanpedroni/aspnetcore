import { TestBed, ComponentFixture } from '@angular/core/testing';
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {

  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(() => {
    // creating dynamic test module
    TestBed.configureTestingModule({
      declarations: [VoterComponent]
    });
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    // fixture.nativeElement //root element
    // fixture.debugElement //wrapper instance of component
  });

  it('should ', () => {
  });
});
