#!/usr/bin/env node
/**
 * Upwork Job Application Tracking System
 * Tracks applications, follow-ups, and conversion metrics
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/upwork-tracker.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize or load data
function loadData() {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    return {
        jobs: [],
        stats: {
            totalApplied: 0,
            totalResponses: 0,
            totalInterviews: 0,
            totalHired: 0,
            totalEarnings: 0
        },
        dailyGoals: {
            applicationsPerDay: 10,
            currentStreak: 0,
            bestStreak: 0
        }
    };
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Add new job application
function addJob(jobData) {
    const data = loadData();
    const job = {
        id: Date.now().toString(),
        dateApplied: new Date().toISOString(),
        status: 'applied',
        ...jobData,
        followUps: [],
        notes: ''
    };
    
    data.jobs.unshift(job);
    data.stats.totalApplied++;
    
    // Update streak
    const today = new Date().toDateString();
    const lastApplication = data.jobs[1]?.dateApplied ? new Date(data.jobs[1].dateApplied).toDateString() : null;
    
    if (lastApplication === today || !lastApplication) {
        data.dailyGoals.currentStreak++;
        if (data.dailyGoals.currentStreak > data.dailyGoals.bestStreak) {
            data.dailyGoals.bestStreak = data.dailyGoals.currentStreak;
        }
    }
    
    saveData(data);
    console.log(`✅ Job added: ${job.title} at ${job.company}`);
    return job;
}

// Update job status
function updateJob(jobId, updates) {
    const data = loadData();
    const jobIndex = data.jobs.findIndex(j => j.id === jobId);
    
    if (jobIndex === -1) {
        console.log('❌ Job not found');
        return null;
    }
    
    const oldStatus = data.jobs[jobIndex].status;
    data.jobs[jobIndex] = { ...data.jobs[jobIndex], ...updates };
    
    // Update stats
    if (updates.status && updates.status !== oldStatus) {
        if (updates.status === 'response') data.stats.totalResponses++;
        if (updates.status === 'interview') data.stats.totalInterviews++;
        if (updates.status === 'hired') {
            data.stats.totalHired++;
            if (updates.earnings) {
                data.stats.totalEarnings += parseFloat(updates.earnings);
            }
        }
    }
    
    saveData(data);
    console.log(`✅ Job updated: ${updates.title || data.jobs[jobIndex].title}`);
    return data.jobs[jobIndex];
}

// Add follow-up
function addFollowUp(jobId, message) {
    const data = loadData();
    const job = data.jobs.find(j => j.id === jobId);
    
    if (!job) {
        console.log('❌ Job not found');
        return null;
    }
    
    job.followUps.push({
        date: new Date().toISOString(),
        message
    });
    
    saveData(data);
    console.log(`✅ Follow-up added for: ${job.title}`);
    return job;
}

// Get follow-up reminders
function getFollowUps() {
    const data = loadData();
    const now = new Date();
    const reminders = [];
    
    data.jobs.forEach(job => {
        if (job.status === 'applied') {
            const appliedDate = new Date(job.dateApplied);
            const daysSince = Math.floor((now - appliedDate) / (1000 * 60 * 60 * 24));
            
            if (daysSince === 2 || daysSince === 5 || daysSince === 7) {
                reminders.push({
                    jobId: job.id,
                    title: job.title,
                    company: job.company,
                    daysSince,
                    url: job.url,
                    urgency: daysSince >= 7 ? 'HIGH' : 'MEDIUM'
                });
            }
        }
    });
    
    return reminders;
}

// Get daily progress
function getDailyProgress() {
    const data = loadData();
    const today = new Date().toDateString();
    
    const todayApps = data.jobs.filter(j => 
        new Date(j.dateApplied).toDateString() === today
    ).length;
    
    const remaining = data.dailyGoals.applicationsPerDay - todayApps;
    
    return {
        appliedToday: todayApps,
        goal: data.dailyGoals.applicationsPerDay,
        remaining: Math.max(0, remaining),
        streak: data.dailyGoals.currentStreak,
        bestStreak: data.dailyGoals.bestStreak
    };
}

// Get weekly report
function getWeeklyReport() {
    const data = loadData();
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    
    const weekJobs = data.jobs.filter(j => new Date(j.dateApplied) >= weekAgo);
    
    return {
        applications: weekJobs.length,
        responses: weekJobs.filter(j => j.status === 'response' || j.status === 'interview' || j.status === 'hired').length,
        interviews: weekJobs.filter(j => j.status === 'interview' || j.status === 'hired').length,
        hired: weekJobs.filter(j => j.status === 'hired').length,
        responseRate: weekJobs.length > 0 ? ((weekJobs.filter(j => j.status !== 'applied').length / weekJobs.length) * 100).toFixed(1) : 0
    };
}

// Generate daily summary for Ruben
function generateDailySummary() {
    const progress = getDailyProgress();
    const followUps = getFollowUps();
    const weekly = getWeeklyReport();
    
    let summary = `📊 UPWORK DAILY SUMMARY\n`;
    summary += `===================\n\n`;
    
    summary += `🎯 TODAY'S PROGRESS:\n`;
    summary += `   Applied: ${progress.appliedToday}/${progress.goal}\n`;
    summary += `   Remaining: ${progress.remaining}\n`;
    summary += `   🔥 Streak: ${progress.streak} days (Best: ${progress.bestStreak})\n\n`;
    
    summary += `📈 THIS WEEK:\n`;
    summary += `   Applications: ${weekly.applications}\n`;
    summary += `   Responses: ${weekly.responses}\n`;
    summary += `   Interviews: ${weekly.interviews}\n`;
    summary += `   Hired: ${weekly.hired}\n`;
    summary += `   Response Rate: ${weekly.responseRate}%\n\n`;
    
    if (followUps.length > 0) {
        summary += `⏰ FOLLOW-UP REMINDERS:\n`;
        followUps.forEach(fu => {
            summary += `   ${fu.urgency === 'HIGH' ? '🔴' : '🟡'} ${fu.title} at ${fu.company} (${fu.daysSince} days)\n`;
        });
        summary += `\n`;
    }
    
    if (progress.remaining > 0) {
        summary += `💡 ACTION NEEDED:\n`;
        summary += `   Apply to ${progress.remaining} more jobs today to hit your goal!\n`;
        summary += `   Link: https://www.upwork.com/ab/find-work/\n`;
    } else {
        summary += `🎉 GOAL CRUSHED!\n`;
        summary += `   You hit your daily target. Great work!\n`;
    }
    
    return summary;
}

// CLI Interface
const command = process.argv[2];

switch (command) {
    case 'add':
        const [title, company, url, rate] = process.argv.slice(3);
        if (!title || !company) {
            console.log('Usage: node upwork-tracker.js add "Job Title" "Company Name" "URL" "Rate"');
            process.exit(1);
        }
        addJob({ title, company, url, rate });
        break;
        
    case 'update':
        const [jobId, status, earnings] = process.argv.slice(3);
        if (!jobId || !status) {
            console.log('Usage: node upwork-tracker.js update <jobId> <status> [earnings]');
            process.exit(1);
        }
        updateJob(jobId, { status, earnings });
        break;
        
    case 'followup':
        const [fuJobId, message] = process.argv.slice(3);
        if (!fuJobId || !message) {
            console.log('Usage: node upwork-tracker.js followup <jobId> "Message"');
            process.exit(1);
        }
        addFollowUp(fuJobId, message);
        break;
        
    case 'reminders':
        const reminders = getFollowUps();
        if (reminders.length === 0) {
            console.log('No follow-ups needed today.');
        } else {
            console.log('⏰ FOLLOW-UP REMINDERS:\n');
            reminders.forEach(r => {
                console.log(`${r.urgency === 'HIGH' ? '🔴' : '🟡'} ${r.title} at ${r.company}`);
                console.log(`   ${r.daysSince} days since application`);
                console.log(`   ${r.url}\n`);
            });
        }
        break;
        
    case 'progress':
        const progress = getDailyProgress();
        console.log(`📊 DAILY PROGRESS`);
        console.log(`Applied: ${progress.appliedToday}/${progress.goal}`);
        console.log(`Remaining: ${progress.remaining}`);
        console.log(`🔥 Streak: ${progress.streak} days`);
        break;
        
    case 'summary':
        console.log(generateDailySummary());
        break;
        
    default:
        console.log('Upwork Job Application Tracker\n');
        console.log('Commands:');
        console.log('  add "Title" "Company" "URL" "Rate"     - Add new application');
        console.log('  update <id> <status> [earnings]      - Update job status');
        console.log('  followup <id> "Message"              - Add follow-up');
        console.log('  reminders                            - Show follow-up reminders');
        console.log('  progress                             - Show daily progress');
        console.log('  summary                              - Generate full daily summary');
}

module.exports = {
    addJob,
    updateJob,
    addFollowUp,
    getFollowUps,
    getDailyProgress,
    getWeeklyReport,
    generateDailySummary
};
