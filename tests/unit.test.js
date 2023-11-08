const MyService = require('../services/MyService');

describe('unitTests', () => {
  it('test  GET', async () => {
    const myService =  new MyService();

    const res = await myService.serveGet(33);

    expect(res).toBe(33);
  });

  it('test  POST', async () => {
    const myService =  new MyService();

    const res = await myService.servePost('f1', 'v1');

    expect(res.field).toBe('f1');
    expect(res.value).toBe('v1');
  });
});