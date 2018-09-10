const { expect, test } = require('@oclif/test');
const fs = require('fs');

const ZoneList = require('../../src/models/ZoneList');

const testFile = 'from_amp/root-index.html';

async function loadTestFile() {
  return fs.readFileSync(testFile);
}

describe('zone-list', () => {
  test
    .it('Parses HTML into a list of zones', async () => {
      const zoneList = new ZoneList();
      zoneList.fetch = loadTestFile;
      const result = await zoneList.stat();

      expect(result).to.be.an('Object').that.has.property('zones');
      expect(result.zones).to.be.an('Array');
      expect(result.zones[0]).to.contain({
        zoneName: 'MAIN ZONE',
        zoneId: 'MainZone',
        status: '-30.0 dB',
        url: 'MainZone/index.html',
      });
    });
});
