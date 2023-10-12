# Pumba Packet Loss

This document explains how to execute my take at home assignment on chaos testing with pumba.

## Installation

The automated test uses nodeJS, hence:

```bash
npm install
```

## Usage

```javascript
Node pumbaPacketLoss.js

```

## Explanation

The main function *runChaosTests* has a boolean parameter which when returned true will handle starting & stopping the docker container (on which the tweets app is running on) at the start & end of the tests. It is set to false by default so it currently expects the Docker container to be running.

Moreover, for each percentage, once the pumba netem command is executed, the test will ping the URL 'http://localhost:8082/tweets' 10 times. 

Note: I am running the docker container on port 8082, you can change the 'URL' variable in the pumbaPacketLoss.js file to point it towards the port your docker container is running on.