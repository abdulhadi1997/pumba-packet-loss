// Link to README: https://github.com/abdulhadi1997/pumba-packet-loss

const { exec } = require('child_process');
const axios = require('axios');

const CONTAINER_NAME = 'vigilant_brattain';
const LOSS_PERCENTAGES = ['50', '20'];
const URL  = `http://localhost:8082/tweets`;

// Function to run Pumba commands
function introducePacketLoss(percentage) {
  exec(
    `pumba netem --interface eth0 --duration 10s loss --percent ${percentage} ${CONTAINER_NAME} 2>&1 /dev/null`
  );
}

// Function to manage Docker container
function manageDockerImage(command) {
    exec(`docker ${command} ${CONTAINER_NAME}`, (error, stdout) => {
        if (error) {
          console.error(`Error restarting the container: ${error}`);
          return;
        }
        console.log(`${command}ing`, stdout);
    });
}

// Function for explicit wait
async function sleep(ms) { return await new Promise(resolve => setTimeout(resolve, ms)); }

// Function to measure response time using Axios
async function measureResponseTime() {
    for(let i = 0; i < 10; i++){
        const startTime = new Date().getTime();
        try {
            await axios.get(URL);
        } catch (error) {
            console.error(`Error sending HTTP request: ${error.message}`);
        }
        const endTime = new Date().getTime();
        console.log(`Response Time: ${(endTime - startTime)} ms`);
    }
}

// Main loop for chaos testing
async function runChaosTests(handleDocker) {
    if(handleDocker==true){
        manageDockerImage('start')
        await sleep(5000)
    }

    for (const lossPercentage of LOSS_PERCENTAGES) {
        console.log(`Testing with ${lossPercentage}% packet loss...`);
        
        introducePacketLoss(lossPercentage);
        
        // Wait for Pumba to apply network conditions
        await sleep(5000)
        
        await measureResponseTime();
        
        // Wait for network conditions to reset
        await sleep(20000)
    }

    console.log('Testing without Pumba...');
    await measureResponseTime();

    if(handleDocker==true){
        manageDockerImage('stop')
    }
}

runChaosTests(false);
