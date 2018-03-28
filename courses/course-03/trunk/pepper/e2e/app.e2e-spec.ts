import { PepperPage } from './app.po';

describe('pepper App', () => {
  let page: PepperPage;

  beforeEach(() => {
    page = new PepperPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
