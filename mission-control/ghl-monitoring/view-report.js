#!/usr/bin/env node
/**
 * Simple report viewer - displays the latest daily report
 */

const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, 'reports');

function getLatestReport() {
  if (!fs.existsSync(reportsDir)) {
    console.log('❌ Reports directory not found. Run the monitor first.');
    return null;
  }

  const files = fs.readdirSync(reportsDir)
    .filter(f => f.startsWith('report-') && f.endsWith('.md'))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.log('📭 No reports found yet. Run: npm run monitor');
    return null;
  }

  return path.join(reportsDir, files[0]);
}

const latestReport = getLatestReport();
if (latestReport) {
  console.log(fs.readFileSync(latestReport, 'utf8'));
}
