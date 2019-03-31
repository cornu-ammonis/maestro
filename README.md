# maestro
maestro is a flexible tool for running repetitive command line tasks. Its core use case is to spin up all the services/servers for a development environment. The current implementation works at the level of one GitHub repo with a maestro.yml defining all services. maestro is designed for OSX but I may add cross-platform capabilities. 

## Installation

I will eventually make this an npm package. For now use these instructions to install: 
- clone the repository
- go to repository directory
- run ` chmod +x bin/maestro `
- run ` npm link `

## Usage
Run maestro by specifying the (folder)name of the a github repository.   

` maestro -g my-repo `  

maestro expects the github repository to contain a maestro.yml file. The yml file defines services, each of which has a command and location, and which may specify whether to run the command in a new terminal window. For example: 

``` 
services:
  webpack-dev-server: 
    command: node_modules/.bin/webpack-dev-server --config ./config/webpack/development.js
    terminalWindow: true

  rails-server: 
    command: rails s
    terminalWindow: true

  redis-server:
    command: redis-server
    terminalWindow: true

  sidekiq:
    command: bundle exec sidekiq -t 25 -c 2 -q default -q mailers
    terminalWindow: true

  goToDirectory:
    command: bash
    terminalWindow: true
    
```
