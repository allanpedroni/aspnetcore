import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  // Arrange
  let component = new VoteComponent();

  beforeEach(() => {
    component = new VoteComponent();
  });

  // afterEach
  // beforeAll
  // afterAll

  it('should increment totalVotes when upvoted', () => {
    component.upVote(); // Act
    expect(component.totalVotes).toBe(1); // Assert
  });
  it('should decrement totalVotes when downvoted', () => {
    component.downVote(); // Act

    expect(component.totalVotes).toBe(-1); // Assert
  });
});
