denon
=====

Control Denon AVR

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/denon.svg)](https://npmjs.org/package/denon)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/fusioned/denon?branch=master&svg=true)](https://ci.appveyor.com/project/fusioned/denon/branch/master)
[![Codecov](https://codecov.io/gh/fusioned/denon/branch/master/graph/badge.svg)](https://codecov.io/gh/fusioned/denon)
[![Downloads/week](https://img.shields.io/npm/dw/denon.svg)](https://npmjs.org/package/denon)
[![License](https://img.shields.io/npm/l/denon.svg)](https://github.com/fusioned/denon/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g denon
$ denon COMMAND
running command...
$ denon (-v|--version|version)
denon/0.0.1 linux-x64 node-v10.9.0
$ denon --help [COMMAND]
USAGE
  $ denon COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`denon help [COMMAND]`](#denon-help-command)
* [`denon input HOSTNAME [INPUT]`](#denon-input-hostname-input)
* [`denon stat HOSTNAME`](#denon-stat-hostname)
* [`denon surround HOSTNAME [MODE]`](#denon-surround-hostname-mode)
* [`denon volume HOSTNAME [VOLUME]`](#denon-volume-hostname-volume)
* [`denon zones HOSTNAME`](#denon-zones-hostname)

## `denon help [COMMAND]`

display help for denon

```
USAGE
  $ denon help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.1/src/commands/help.ts)_

## `denon input HOSTNAME [INPUT]`

INPUT: View/set source input

```
USAGE
  $ denon input HOSTNAME [INPUT]

OPTIONS
  -z, --zone=zone  [default: MainZone] Zone ID to affect

DESCRIPTION
  ...
  The input parameter can be any found the list, or 'list' to view this list
```

_See code: [src/commands/input.js](https://github.com/fusioned/denon/blob/v0.0.1/src/commands/input.js)_

## `denon stat HOSTNAME`

Fetch state and details of the zone

```
USAGE
  $ denon stat HOSTNAME

OPTIONS
  -f, --filter=filter  Zone [ID] to filter for
  -i, --inputs         List available input sources
  -m, --modes          List available surround modes
  -s, --no-state       Do not show state [default: show]
  -z, --zone=zone      Exact Zone ID to list

DESCRIPTION
  ...
  Available types of data:
  - state: system flags, selected options
  - modes: list of available surround modes
  - inputs: list of available inputs
```

_See code: [src/commands/stat.js](https://github.com/fusioned/denon/blob/v0.0.1/src/commands/stat.js)_

## `denon surround HOSTNAME [MODE]`

SURROUND: View/set the surround sound mode

```
USAGE
  $ denon surround HOSTNAME [MODE]

OPTIONS
  -z, --zone=zone  [default: MainZone] Zone ID to affect

DESCRIPTION
  ...
  The given parameter either queries, or sets the mode.
  Querying parameters are:
     - ls / list : list modes in the format of  modeID : mode name
     - show : current selected mode
  
  Setters are:
     - <mode> : one of the modeIDs from the list
     - <category> : one of MOVIE, MUSIC, GAME
```

_See code: [src/commands/surround.js](https://github.com/fusioned/denon/blob/v0.0.1/src/commands/surround.js)_

## `denon volume HOSTNAME [VOLUME]`

VOLUME: Modify volume levels

```
USAGE
  $ denon volume HOSTNAME [VOLUME]

OPTIONS
  -z, --zone=zone  [default: MainZone] Zone ID to affect

DESCRIPTION
  ...
  Omitting the directive will return the volume.
  The directive should be: up, down, or the dB level setting in 0.5 increments
```

_See code: [src/commands/volume.js](https://github.com/fusioned/denon/blob/v0.0.1/src/commands/volume.js)_

## `denon zones HOSTNAME`

View zones

```
USAGE
  $ denon zones HOSTNAME

OPTIONS
  -f, --filter=filter  filter name

DESCRIPTION
  ...
  List all available zones with their metadata
```

_See code: [src/commands/zones.js](https://github.com/fusioned/denon/blob/v0.0.1/src/commands/zones.js)_
<!-- commandsstop -->
