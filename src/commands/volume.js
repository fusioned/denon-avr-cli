const { Command, flags } = require('@oclif/command');
const Zone = require('../models/Zone');

const { filterHostname, fetchZoneIds } = require('../utils/zone-command-helper');
const { createVolumeCommand, DEFAULT_ZONE } = require('../models/denon-commands');

class VolumeCommand extends Command {
  async run() {
    const { args, flags } = this.parse(VolumeCommand);
    const target = filterHostname(args.hostname);
    const zoneIds = flags.zone ? [flags.zone] : await fetchZoneIds(target, flags.filter);
    const zoneHandler = new Zone(target);

    try {
      await Promise.all(zoneIds.map(zoneId => this.processZone(zoneHandler, zoneId, args.volume)));
    } catch (error) {
      this.error(error);
    }
  }

  async processZone(zoneHandler, zoneId, volume) {
    if (!volume) {
      const zoneData = await zoneHandler.query(zoneId);
      this.log(zoneData.state.volume);
    } else {
      const command = createVolumeCommand(volume);
      if (command) {
        await zoneHandler.sendCommand(zoneId, command);
      }
    }
  }
}

VolumeCommand.description = `VOLUME: Modify volume levels
...
Omitting the directive will return the volume.
The directive should be: up, down, or the dB level setting in 0.5 increments
`;

VolumeCommand.args = [
  { name: 'hostname', required: true },
  { name: 'volume', required: false },
];

VolumeCommand.flags = {
  zone: flags.string({ char: 'z', description: 'Zone ID to affect', default: DEFAULT_ZONE }),
};

module.exports = VolumeCommand;
