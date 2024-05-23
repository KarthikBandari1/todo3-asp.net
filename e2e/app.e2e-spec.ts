import { todo3TemplatePage } from './app.po';

describe('todo3 App', function() {
  let page: todo3TemplatePage;

  beforeEach(() => {
    page = new todo3TemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
