# GoManager Exporter
Exporter Tool for accounts stored it GoManager data file.

Usage is pretty simple, it needs an recent Node version.
Just call:
```
node index.js pathToData\data.json.gz
```

It will output all the accounts stored in the file using RM format, separated in blocks by Group (accounts without group will go into "Default" group) and sorted by account name (it is a string comparison so "xxx1200" will be before "xxx200").
