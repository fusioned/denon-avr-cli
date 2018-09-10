const { Command, flags } = require('@oclif/command');
const Zone = require('../models/Zone');

const { filterHostname, fetchZoneIds } = require('../utils/zone-command-helper');
const { createSurroundModeCommand, DEFAULT_ZONE, SURROUND_MODE_CATEGORIES } = require('../models/denon-commands');

class SurroundCommand extends Command {
  async run() {
    const { flags, args } = this.parse(SurroundCommand);
    const target = filterHostname(args.hostname);
    const zoneIds = flags.zone ? [flags.zone] : await fetchZoneIds(target, flags.filter);
    const zoneHandler = new Zone(target);

    try {
      await Promise.all(zoneIds.map(zoneId => this.processZone(zoneHandler, zoneId, args.mode)));
    } catch (error) {
      this.error(error);
    }
  }

  /**
   *
   * @param zoneHandler
   * @param zoneId
   * @param mode
   * @returns {Promise<void>}
   */
  async processZone(zoneHandler, zoneId, mode) {
    switch (mode ? mode.toLowerCase() : 'show') {
      case 'show': {
        const zoneData = await zoneHandler.query(zoneId);
        this.log(zoneData.state.surroundMode);
        break;
      }
      case 'ls':
      case 'list': {
        const zoneData = await zoneHandler.query(zoneId);
        this.log(zoneData.modes);
        break;
      }
      default: {
        const command = createSurroundModeCommand(mode);
        if (command) {
          await zoneHandler.sendCommand(zoneId, command);
        }
      }
    }
  }
}

SurroundCommand.description = `SURROUND: View/set the surround sound mode
...
The given parameter either queries, or sets the mode.
Querying parameters are:
  - ls / list : list modes in the format of  modeID : mode name
  - show : current selected mode
  
Setters are:
  - <mode> : one of the modeIDs from the list
  - <category> : one of ${SURROUND_MODE_CATEGORIES.join(', ')}
`;

SurroundCommand.flags = {
  zone: flags.string({ char: 'z', description: 'Zone ID to affect', default: DEFAULT_ZONE }),
};

SurroundCommand.args = [
  { name: 'hostname', required: true },
  { name: 'mode', required: false },
];

module.exports = SurroundCommand;
