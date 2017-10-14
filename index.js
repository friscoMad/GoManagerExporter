'use strict';

var zlib = require('zlib');
var fs = require('fs');

function getAccount(manager) {
  let settings = manager.UserSettings;
  return {
     user: settings.Username,
     password: settings.Password,
     account: settings.AccountName,
     group: settings.GroupName
   };
}

function readFile(path) {
  let file = fs.readFileSync(path);
  const contents = zlib.gunzipSync(file);
  file = null;
  const data = JSON.parse(contents);
  const groups = data.Managers.$values.map(getAccount)
    .reduce((res, a) => {
      let normalizedGroup = a.group ? a.group : 'others';
      if (!res[normalizedGroup]) {
        res[normalizedGroup] = [];
      }
      res[a.group?a.group:'others'].push(a);
      return res;
      }, {});
  Object.entries(groups).forEach(([group, val]) => {
    console.log(`\nGroup: ${group}`);
    val.sort((a,b) => a.user.localeCompare(b.user))
      .forEach(account => console.log(`ptc,${account.user},${account.password}`));
  });
}

var args = process.argv.slice(2);
readFile(args[0]);
