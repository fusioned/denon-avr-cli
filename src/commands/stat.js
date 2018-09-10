const { Command, flags } = require('@oclif/command');
const Zone = require('../models/Zone');
const { filterHostname, fetchZoneIds } = require('../utils/zone-command-helper');

class StatCommand extends Command {
  async run() {
    const { args, flags } = this.parse(StatCommand);
    const target = filterHostname(args.hostname);
    const zoneHandler = new Zone(target);

    try {
      const zoneIds = flags.zone ? [flags.zone] : await fetchZoneIds(target, flags.filter);

      zoneIds.forEach(async (zoneId) => {
        const data = await zoneHandler.query(zoneId);
        const result = this.pickData(data, { state: !flags['no-state'], ...flags });
        this.log({ [zoneId]: result });
        return result;
      });
    } catch (error) {
      this.error(error);
    }
  }

  /**
   *
   * @param {object} data
   * @param {object} pick   hash of key => boolean; truthy means data should be picked out
   */
  pickData(data, pick = {}) {
    const result = {};
    for (const key in pick) {
      if (pick[key] && data[key]) {
        result[key] = data[key];
      }
    }
    return result;
  }
}

StatCommand.description = `Fetch state and details of the zone
...
Available types of data:
- state: system flags, selected options
- modes: list of available surround modes
- inputs: list of available inputs
`;

StatCommand.args = [
  { name: 'hostname', required: true },
];

StatCommand.flags = {
  filter: flags.string({ char: 'f', description: 'Zone [ID] to filter for' }),
  zone: flags.string({ char: 'z', description: 'Exact Zone ID to list' }),
  inputs: flags.boolean({ char: 'i', description: 'List available input sources' }),
  modes: flags.boolean({ char: 'm', description: 'List available surround modes' }),
  'no-state': flags.boolean({ char: 's', description: 'Do not show state [default: show]' }),
};

module.exports = StatCommand;
