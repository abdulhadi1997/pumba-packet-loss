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

The main function *runChaosTests* has a boolean parameter which when returned true will handle starting & stopping the docker container that the tweets app is running on at the start & end of the tests.

Moreover, for each percentage, once the pumba netem command is executed, the test will ping the URL 'http://localhost:8082/tweets' 10 times. 

Note: I am running the docker container on port 8082, you can change the 'URL' variable in the pumbaPacketLoss.js file to point it towards the port your docker container is running on.