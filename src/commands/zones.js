const { Command, flags } = require('@oclif/command');
const Zones = require('../models/ZoneList');
const { filterHostname } = require('../utils/zone-command-helper');

class ZonesCommand extends Command {
  async run() {
    const { args, flags } = this.parse(ZonesCommand);
    const target = filterHostname(args.hostname);
    const zonesRetriever = new Zones(target);

    try {
      let info = await zonesRetriever.stat();

      if (flags.filter) {
        info = info.zones.find(zone => (zone.zoneName
          .toUpperCase()
          .match(flags.filter.toUpperCase())
        ));
      }

      this.log(info);
    } catch (error) {
      this.error(error.toString());
    }
  }
}

ZonesCommand.args = [
  { name: 'hostname', required: true },
];

ZonesCommand.description = `View zones
...
List all available zones with their metadata
`;

ZonesCommand.flags = {
  filter: flags.string({ char: 'f', description: 'filter name' }),
};

module.exports = ZonesCommand;
