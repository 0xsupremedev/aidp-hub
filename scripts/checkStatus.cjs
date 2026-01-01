#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const axios = require('axios');

const argv = yargs(hideBin(process.argv))
    .option('jobId', { type: 'string', demandOption: true, describe: 'The ID of the job to check' })
    .argv;

(async () => {
    try {
        const gateway = process.env.GATEWAY_URL || 'http://localhost:4000';
        console.log(`🔍 Checking status for job: ${argv.jobId} at ${gateway}...`);

        const r = await axios.get(`${gateway}/api/status/${argv.jobId}`);
        console.log('\n📊 JOB STATUS REPORT:');
        console.log('----------------------------');
        console.log(JSON.stringify(r.data.job, null, 2));

        if (r.data.job.status === 'completed') {
            console.log('\n✅ Mission Success: Job verified on AIDP network.');
        } else {
            console.log('\n⏳ Job is still being processed by decentralized nodes...');
        }
    } catch (e) {
        console.error('❌ ERROR:', e.response?.data || e.message);
        process.exit(1);
    }
})();
