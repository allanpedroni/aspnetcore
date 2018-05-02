import { By } from '@angular/platform-browser';
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

  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('.vote-count'));
    const el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain(21);
  });
  it('should highlight the upvote button if I have upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    expect(de.classes['highlighted']).toBeTruthy();
  });
  it('should increase total votes when I click the upvote button', () => {

    const button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    button.triggerEventHandler('click', null);

    expect(component.totalVotes).toBe(1);
  });
});
