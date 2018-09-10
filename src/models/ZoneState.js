const cheerio = require('cheerio');

class ZoneState {
  constructor(xml) {
    this.inputs = {};
    this.modes = {};
    this.state = {};
    this.load(xml);
  }

  load(xml) {
    this.$ = cheerio.load(xml);
    this.parseAll();
  }

  parseAll() {
    Object.assign(this.state, this.parseZoneState());
    this.inputs = this.parseInputs();
    this.modes = this.parseSurroundList();
  }

  parseZoneState() {
    const $ = this.$;
    return {
      power: $('Power value').text(),
      zonePower: $('ZonePower value').text() === 'ON',
      source: $('InputFuncSelectMain value').text(),
      surroundMode: $('selectSurround value').text().trim(),
      volume: $('MasterVolume').text(),
      mute: $('Mute value').text() === 'on',
    };
  }

  parseInputs() {
    const $ = this.$;
    const sourceIds = $('InputFuncList > value').get();
    const sourceNames = $('RenameSource > value').get();
    const sourceEnabled = $('SourceDelete > value').get();
    const result = {};
    let item;

    while (item = sourceIds.pop()) {
      const name = $(sourceNames.pop());
      const isEnabled = $(sourceEnabled.pop()).text() !== 'DEL';

      if (isEnabled) {
        result[$(item).text()] = name.text().trim();
      }
    }

    return result;
  }

  parseSurroundList() {
    const $ = this.$;
    const modes = $('SurroundLists value');
    const results = {};

    modes
      .filter((_, node) => $(node).attr('index') !== '')
      .each((_, value) => {
        results[$(value).attr('index')] = $(value).attr('table');
      });

    return results;
  }
}

module.exports = ZoneState;
