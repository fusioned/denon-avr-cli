const { Command, flags } = require('@oclif/command');
const Zone = require('../models/Zone');

const { filterHostname, fetchZoneIds } = require('../utils/zone-command-helper');
const { createSetInputCommand, DEFAULT_ZONE } = require('../models/denon-commands');

class InputCommand extends Command {
  async run() {
    const { flags, args } = this.parse(InputCommand);
    const target = filterHostname(args.hostname);
    const zoneIds = flags.zone ? [flags.zone] : await fetchZoneIds(target, flags.filter);
    const zoneHandler = new Zone(target);

    try {
      await Promise.all(zoneIds.map(zoneId => this.processZone(zoneHandler, zoneId, args.input)));
    } catch (error) {
      this.error(error);
    }
  }

  async processZone(zoneHandler, zoneId, input) {
    switch (input ? input.toLowerCase() : 'show') {
      case 'show': {
        const zoneData = await zoneHandler.query(zoneId);
        this.log(zoneData.state.source);
        break;
      }
      case 'ls':
      case 'list': {
        const zoneData = await zoneHandler.query(zoneId);
        this.log(zoneData.inputs);
        break;
      }
      default: {
        const command = createSetInputCommand(input);
        if (command) {
          await zoneHandler.sendCommand(zoneId, command);
        }
      }
    }
  }
}

InputCommand.description = `INPUT: View/set source input
...
The input parameter can be any found the list, or 'list' to view this list
`;

InputCommand.flags = {
  zone: flags.string({ char: 'z', description: 'Zone ID to affect', default: DEFAULT_ZONE }),
};

InputCommand.args = [
  { name: 'hostname', required: true },
  { name: 'input', required: false },
];

module.exports = InputCommand;
