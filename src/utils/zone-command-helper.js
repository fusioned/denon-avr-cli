const Zones = require('../models/ZoneList');

module.exports = {
  filterHostname(hostname) {
    return hostname.match(/^https?:/) ? hostname : `http://${hostname}`;
  },

  async fetchZoneIds(target, zoneFilter = '') {
    const zoneList = new Zones(target);
    const allZones = await zoneList.stat();
    let { zones } = allZones;

    if (zoneFilter) {
      zones = zones.filter(zone => zone.zoneId.toUpperCase().match(zoneFilter.toUpperCase()));
    }

    return zones.map(zone => zone.zoneId);
  },
};
