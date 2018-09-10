const axios = require('axios');
const ZoneState = require('./ZoneState');
const qs = require('qs');

const postConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  timeout: 3000,
};

const getConfig = {
  timeout: 2000,
};

class Zone {
  /**
   *
   * @param {string} baseUrl service location, including protocol e.g. http://10.10.10.1
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.zoneUrl = `${this.baseUrl}/goform/formMainZone_MainZoneXml.xml`;
    this.makeCmdUrl = zoneId => `${this.baseUrl}/${zoneId}/index.put.asp`;
    this.axiosConfig = { get: getConfig, post: postConfig };
  }

  /**
   *
   * @param {string} zoneId Identifier
   * @returns {Promise<void>} of a ZoneState
   */
  async query(zoneId) {
    const response = await this.fetchXml(zoneId);
    return new ZoneState(response);
  }

  async fetchXml(zoneId) {
    const response = await axios.get(this.zoneUrl, {
      params: { ZoneName: zoneId },
      ...this.axiosConfig.get,
    });
    return response.data;
  }

  async sendCommand(zoneId, command, data = {}) {
    const post = qs.stringify({ cmd0: command, ...data });
    const response = await axios.post(this.makeCmdUrl(zoneId), post, this.axiosConfig.post);
    return response;
  }
}

module.exports = Zone;
