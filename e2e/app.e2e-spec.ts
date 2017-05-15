import { NinjaPage } from './app.po';

describe('ninja App', function() {
  let page: NinjaPage;

  beforeEach(() => {
    page = new NinjaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
