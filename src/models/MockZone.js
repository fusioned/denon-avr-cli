const fs = require('fs');
const ZoneState = require('./ZoneState');

class MockZone {
  /**
   *
   * @param {string} xmlData zone data
   */
  constructor(xmlData) {
    this.xmlData = xmlData;
  }

  /**
   *
   * @param {string} zoneId Identifier
   * @returns {Promise<void>} of a ZoneState
   */
  query() {
    const response = this.fetchXml();
    return new ZoneState(response);
  }

  fetchXml() {
    return this.xmlData;
  }

  loadXml(filename) {
    this.xmlData = fs.readFileSync(filename);
  }
}

module.exports = MockZone;
