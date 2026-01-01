#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const axios = require('axios');
const fs = require('fs');

const argv = yargs(hideBin(process.argv))
    .option('model', { type: 'string', describe: 'AI model to use' })
    .option('input', { type: 'string', describe: 'Input file path' })
    .argv;

(async () => {
    try {
        const payload = {
            model: argv.model || 'mistral-7b-v0.2',
            input: argv.input ? fs.readFileSync(argv.input, { encoding: 'base64' }) : 'Simulated prompt from CLI',
        };

        const gateway = process.env.GATEWAY_URL || 'http://localhost:4000';
        console.log(`📡 Connecting to gateway: ${gateway}...`);

        const r = await axios.post(`${gateway}/api/submit`, { jobType: 'inference', payload });
        console.log('✅ JOB SUBMITTED:', JSON.stringify(r.data, null, 2));
        console.log(`\n💡 To check status, run: node scripts/checkStatus.cjs --jobId=${r.data.jobId}`);
    } catch (e) {
        console.error('❌ ERROR:', e.response?.data || e.message);
        process.exit(1);
    }
})();
