'use strict';

const argv = require('yargs').argv;
const fs = require('fs');
const os = require('os');
const path = require('path');
const MANIFEST_PATH = path.join(path.dirname(__dirname), 'src', 'manifest.json');

let manifest = require('../src/manifest.json');

const oldVersion = manifest.version;
const splittedVersion = oldVersion.split('.');

switch (argv.version) {
    case 'major':
    {
        splittedVersion[0]++;
        splittedVersion[1] = 0;
        splittedVersion[2] = 0;
        break;
    }
    case 'minor':
    {
        splittedVersion[1]++;
        splittedVersion[2] = 0;
        break;
    }
    case 'patch':
    {
        splittedVersion[2]++;
        break;
    }
    default:
    {
        console.error('Version should be: major, minor or patch');
        process.exit(1);
    }
}

manifest.version = splittedVersion.join('.');

const newManifest = JSON.stringify(manifest, null, 2).replace(/[\n]/g, os.EOL) + os.EOL;

fs.writeFileSync(MANIFEST_PATH, newManifest);

console.log(`Version was increased from ${oldVersion} to ${manifest.version}`);
