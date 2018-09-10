const axios = require('axios');
const cheerio = require('cheerio');

class ZoneList {
  /**
   * @param hostname {string} Service base URL
   */
  constructor(hostname) {
    this.hostname = hostname;
  }

  /**
   *
   * @param {string} html
   * @returns {{name: string, zones: [cheerio]}}
   */
  static parse(html) {
    const $ = cheerio.load(html);

    return {
      name: $('body > table:first-child tr:nth-child(2)').text(),
      zones: $('body > center > table table').map((i, item) => {
        const zoneUrl = $('tbody > tr:first-child td:first-child', item)
          .attr('onclick')
          .match(/"([^"]+)"/)[1];
        return {
          zoneName: $('tbody > tr:first-child .IndexPWON', item).text().trim(),
          url: zoneUrl,
          zoneId: zoneUrl.match(/^([\w]+)/)[1],
          status: $('tbody > tr:nth-child(3) .IndexPWON', item).text(),
        };
      }).get(),
    };
  }

  /**
   *
   * @returns {Promise<*>}
   */
  async fetch() {
    const response = await axios.get(this.hostname, { timeout: 2000 });
    return response.data;
  }

  /**
   *
   * @returns {Promise<{name, zones}>}
   */
  async stat() {
    const html = await this.fetch();
    return this.parse(html);
  }
}

module.exports = ZoneList;
