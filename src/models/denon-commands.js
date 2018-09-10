
const DEFAULT_ZONE = 'MainZone';

const VOLUME_SET = 'PutMasterVolumeSet/';
const VOLUME_UP = 'PutMasterVolumeBtn/>';
const VOLUME_DOWN = 'PutMasterVolumeBtn/<';

const VOLUME_MUTE = 'PutVolumeMute/on';
const VOLUME_UNMUTE = 'PutVolumeMute/off';

const MAX_VOLUME = 18.0;
const MIN_VOLUME = -85.0;

const VOLUME_MAP = {
  up: VOLUME_UP,
  down: VOLUME_DOWN,
  mute: VOLUME_MUTE,
  unmute: VOLUME_UNMUTE,
};

const SURROUND_MODE = 'PutSurroundMode/';
const SURROUND_MODE_CATEGORIES = ['MOVIE', 'MUSIC', 'GAME'];

const INPUT_FUNCTION = 'PutZone_InputFunction/';

function limitValueRange(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createVolumeCommand(volumeArg) {
  const command = VOLUME_MAP[volumeArg.toLowerCase()];
  if (!command) {
    const dbValue = limitValueRange(parseFloat(volumeArg), MIN_VOLUME, MAX_VOLUME);
    return VOLUME_SET + String(dbValue);
  }
  return command;
}

function createSurroundModeCommand(mode) {
  const command = SURROUND_MODE + mode.toUpperCase();
  return command;
}

function createSetInputCommand(source) {
  const command = INPUT_FUNCTION + source.toUpperCase();
  return command;
}

module.exports = {
  DEFAULT_ZONE,
  SURROUND_MODE_CATEGORIES,
  createVolumeCommand,
  createSurroundModeCommand,
  createSetInputCommand,
};
