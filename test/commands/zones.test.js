const { expect, test } = require('@oclif/test');
const fs = require('fs');

const testIndexFile = 'from_amp/root-index.html';

describe('zones', () => {
  const testData = fs.readFileSync(testIndexFile);

  test
    .nock('http://localhost', api => api
      .get('/').reply(200, testData)
    )
    .stdout()
    .command(['zones', 'localhost'])
    .it('runs zones localhost', (ctx) => {
      expect(ctx.stdout).to.contain('MainZone');
    });

  test
    .nock('http://localhost', api => api
      .get('/').reply(200, testData)
    )
    .stdout()
    .command(['zones', 'localhost', '-f', 'main'])
    .it('runs zones localhost -f main', (ctx) => {
      expect(ctx.stdout).to.contain('MainZone');
    });
});
