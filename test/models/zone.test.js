const { expect, test } = require('@oclif/test');
const ZoneTest = require('../../src/models/MockZone');
const ZoneState = require('../../src/models/ZoneState');

const testFile = 'from_amp/formMainZone_MainZoneXml.xml';

describe('zone', () => {
  test
    .stdout()
    .it('Parses XML into a ZoneState', () => {
      const zone = new ZoneTest();
      zone.loadXml(testFile);
      const state = zone.query();
      expect(state).to.be.an.instanceOf(ZoneState);
    });

  test
    .stdout()
    .it('ZoneState to contain state property', () => {
      const zone = new ZoneTest();
      zone.loadXml(testFile);
      const state = zone.query();
      expect(state).to.have.property('state');
      expect(state.state).to.have.property('power');
    });
});
