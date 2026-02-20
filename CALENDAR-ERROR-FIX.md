# FIX: Calendar is not defined Error

## The Problem
Google Apps Script needs the **Advanced Calendar Service** enabled.

## The Fix (30 seconds)

### Step 1: Enable Calendar Service
1. In your Google Apps Script project
2. Click **"Services"** (left sidebar, looks like a + icon)
3. Click **"Add a service"**
4. Find **"Google Calendar API"** in the list
5. Click **Add**

### Step 2: Run Again
1. Click the **▶️ Run** button again
2. It should work now!

---

## Alternative: Use Simpler Code (No Advanced Service Needed)

If that doesn't work, use this **simpler version** that uses basic CalendarApp instead:

```javascript
function createRubenCalendarSimple() {
  // Get default calendar
  var calendar = CalendarApp.getDefaultCalendar();
  
  // Set timezone
  var tz = 'America/Los_Angeles';
  
  // Create daily workout event (starting Feb 20, recurring for 30 days)
  var workout = calendar.createEventSeries(
    '💪 WORKOUT - No Excuses',
    new Date('2026-02-20T04:00:00'),
    new Date('2026-02-20T05:00:00'),
    CalendarApp.newRecurrence().addDailyRule().times(300), // 300 days
    {description: 'David Goggins mode. Discipline = income.\n\nFocus: Strength + cardio\nGoal: 45-60 min intense workout'}
  );
  workout.setColor(CalendarApp.EventColor.RED);
  console.log('✅ Created: WORKOUT');
  
  // Create Upwork event
  var upwork = calendar.createEventSeries(
    '💰 Upwork - Apply to 10 Jobs',
    new Date('2026-02-20T05:00:00'),
    new Date('2026-02-20T06:00:00'),
    CalendarApp.newRecurrence().addDailyRule().times(300),
    {description: 'Goal: 10 applications/day\n\nLink: https://www.upwork.com/ab/find-work/'}
  );
  upwork.setColor(CalendarApp.EventColor.BLUE);
  console.log('✅ Created: Upwork');
  
  // Create CushionFoamz event
  var cushion = calendar.createEventSeries(
    '📱 CushionFoamz Marketing',
    new Date('2026-02-20T06:00:00'),
    new Date('2026-02-20T06:30:00'),
    CalendarApp.newRecurrence().addDailyRule().times(300),
    {description: 'Post 1-2 Reddit responses + check social media'}
  );
  cushion.setColor(CalendarApp.EventColor.GREEN);
  console.log('✅ Created: CushionFoamz');
  
  // Create Evening Review
  var review = calendar.createEventSeries(
    '🌙 Daily Review + Tomorrow Prep',
    new Date('2026-02-20T21:00:00'),
    new Date('2026-02-20T22:00:00'),
    CalendarApp.newRecurrence().addDailyRule().times(300),
    {description: 'Set 3 priorities for next day'}
  );
  review.setColor(CalendarApp.EventColor.GRAY);
  console.log('✅ Created: Evening Review');
  
  // Create weekly events
  // Monday - Client Work
  calendar.createEventSeries(
    '🔥 Client Work / Sales Calls',
    new Date('2026-02-24T11:00:00'),
    new Date('2026-02-24T14:30:00'),
    CalendarApp.newRecurrence().addWeeklyRule().onlyOnWeekday(CalendarApp.Weekday.MONDAY).times(50),
    {description: 'Focus: Closing deals, client calls, proposal reviews'}
  );
  console.log('✅ Created: Monday Client Work');
  
  // Tuesday - Project Delivery
  calendar.createEventSeries(
    '⚡ Client Work / Project Delivery',
    new Date('2026-02-25T10:00:00'),
    new Date('2026-02-25T14:30:00'),
    CalendarApp.newRecurrence().addWeeklyRule().onlyOnWeekday(CalendarApp.Weekday.TUESDAY).times(50),
    {description: 'Focus: Delivering work, client updates, billing'}
  );
  console.log('✅ Created: Tuesday Delivery');
  
  // Wednesday - Prospecting
  calendar.createEventSeries(
    '🎯 Prospecting / Cold Outreach',
    new Date('2026-02-26T09:30:00'),
    new Date('2026-02-26T13:30:00'),
    CalendarApp.newRecurrence().addWeeklyRule().onlyOnWeekday(CalendarApp.Weekday.WEDNESDAY).times(50),
    {description: 'Focus: Sending audits, follow-up calls, new lead gen'}
  );
  console.log('✅ Created: Wednesday Prospecting');
  
  // Thursday - Content
  calendar.createEventSeries(
    '📝 Content Creation / Long-term Assets',
    new Date('2026-02-27T09:30:00'),
    new Date('2026-02-27T13:30:00'),
    CalendarApp.newRecurrence().addWeeklyRule().onlyOnWeekday(CalendarApp.Weekday.THURSDAY).times(50),
    {description: 'Focus: Blog posts, social media, SEO content'}
  );
  console.log('✅ Created: Thursday Content');
  
  // Friday - Week Review
  calendar.createEventSeries(
    '📊 Week Review + Planning',
    new Date('2026-02-21T09:30:00'),
    new Date('2026-02-21T11:30:00'),
    CalendarApp.newRecurrence().addWeeklyRule().onlyOnWeekday(CalendarApp.Weekday.FRIDAY).times(50),
    {description: 'Review week\'s results with Johnny 5'}
  );
  console.log('✅ Created: Friday Review');
  
  console.log('\n🎉 All events created successfully!');
  return 'Done!';
}
```

### To use this simpler version:
1. Delete the old code
2. Paste this new code
3. Save (Cmd+S)
4. Run ▶️

**This version doesn't need any special services enabled.**

---

## Quick Check

**Did it work?** Check your calendar:
https://calendar.google.com

**Still not working?** Use the .ics file import - it's guaranteed to work:
```
open ~/.openclaw/workspace/ruben-calendar-import.ics
```

---

*Fix provided: February 20, 2026*
