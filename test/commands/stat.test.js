const fs = require('fs')
const {expect, test} = require('@oclif/test');

const testIndexFile = 'from_amp/root-index.html';
const testZoneFile = 'from_amp/formMainZone_MainZoneXml.xml';

describe('stat', () => {
  const testData = fs.readFileSync(testIndexFile);
  const testZone = fs.readFileSync(testZoneFile);

  test
    .nock('http://localhost', api => api
      .get('/').reply(200, testData)
      .get('/goform/formMainZone_MainZoneXml.xml?ZoneName=MainZone').reply(200, testZone)
      .get('/goform/formMainZone_MainZoneXml.xml?ZoneName=Zone2').reply(200, '')
    )
    .stdout()
    .stderr()
    .command(['stat', 'localhost'])
    .it('runs stat localhost', (ctx) => {
      expect(ctx.stdout).to.contain("power:");
    });
});
