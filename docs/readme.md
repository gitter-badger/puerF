# Development documentation

This document and documents in subfolders provide information for development work on puerFreemarker.

## Commandline interface

puerF uses [commander.js](https://github.com/tj/commander.js) to implement cli interactions.
You can see a good documentation on how clis are documentet in their --help at [docopt.org](http://docopt.org/).


## Development process

This project follows a git workflow based on a [successful git branching model](http://nvie.com/posts/a-successful-git-branching-model/) by Vincent Driessen. However we mainly use three types of braches:
- master, this brach contains the last working and stable release
- development, for further development
- release-x.x.x, for a specific release

We are currently not using feature branches, as the project simply isn't big enough for it yet. Please read the link above for more information.

One of the important things to remember it to use `--no-ff` when merging branches. This makes sure we always create a new commit object. Just makes viewing the flow afterwards nicer.