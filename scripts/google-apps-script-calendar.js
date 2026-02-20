function createRubenCalendar() {
  // Calendar ID (Ruben's calendar)
  const calendarId = 'rubenstips@gmail.com';
  
  // Daily recurring events
  const dailyEvents = [
    {
      summary: '💪 WORKOUT - No Excuses',
      description: 'David Goggins mode. Discipline = income.\n\nFocus: Strength + cardio\nGoal: 45-60 min intense workout\nLocation: Gym or home',
      start: { dateTime: '2026-02-20T04:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-20T05:00:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
      colorId: 11,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 10 }
        ]
      }
    },
    {
      summary: '💰 Upwork - Apply to 10 Jobs',
      description: 'Goal: 10 applications/day minimum\n\nTemplates: business/Ruben-Upwork-Cover-Letters.md\nLink: https://www.upwork.com/ab/find-work/',
      start: { dateTime: '2026-02-20T05:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-20T06:00:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
      colorId: 9,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 5 }
        ]
      }
    },
    {
      summary: '📱 CushionFoamz Marketing',
      description: 'Post 1-2 Reddit responses + check social media\n\nResponses: CUSHIONFOAMZ-REDDIT-CONVERSATIONS.md',
      start: { dateTime: '2026-02-20T06:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-20T06:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
      colorId: 10,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 0 }
        ]
      }
    },
    {
      summary: '🌙 Daily Review + Tomorrow Prep',
      description: 'Set 3 priorities for next day\n\n- Review Johnny 5\'s daily output\n- Check calendar for tomorrow\n- Set 3 main priorities',
      start: { dateTime: '2026-02-20T21:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-20T22:00:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=DAILY;UNTIL=20261231T235959Z'],
      colorId: 8,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 15 }
        ]
      }
    }
  ];
  
  // Create daily events
  console.log('Creating daily recurring events...');
  dailyEvents.forEach(event => {
    try {
      Calendar.Events.insert(event, calendarId);
      console.log('✅ Created: ' + event.summary);
    } catch (err) {
      console.error('❌ Failed: ' + event.summary + ' - ' + err.message);
    }
  });
  
  // Weekly events
  const weeklyEvents = [
    {
      summary: '🔥 Client Work / Sales Calls',
      description: 'Focus: Closing deals, client calls, proposal reviews',
      start: { dateTime: '2026-02-24T11:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-24T14:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20261231T235959Z'],
      colorId: 9
    },
    {
      summary: '⚡ Client Work / Project Delivery',
      description: 'Focus: Delivering work, client updates, billing',
      start: { dateTime: '2026-02-25T10:00:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-25T14:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=TU;UNTIL=20261231T235959Z'],
      colorId: 9
    },
    {
      summary: '🎯 Prospecting / Cold Outreach',
      description: 'Focus: Sending audits, follow-up calls, new lead gen',
      start: { dateTime: '2026-02-26T09:30:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-26T13:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=WE;UNTIL=20261231T235959Z'],
      colorId: 6
    },
    {
      summary: '📝 Content Creation / Long-term Assets',
      description: 'Focus: Blog posts, social media, SEO content',
      start: { dateTime: '2026-02-27T09:30:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-27T13:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=TH;UNTIL=20261231T235959Z'],
      colorId: 5
    },
    {
      summary: '📊 Week Review + Planning',
      description: 'Review week\'s results with Johnny 5',
      start: { dateTime: '2026-02-21T09:30:00', timeZone: 'America/Los_Angeles' },
      end: { dateTime: '2026-02-21T11:30:00', timeZone: 'America/Los_Angeles' },
      recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=FR;UNTIL=20261231T235959Z'],
      colorId: 7
    }
  ];
  
  console.log('Creating weekly work blocks...');
  weeklyEvents.forEach(event => {
    try {
      Calendar.Events.insert(event, calendarId);
      console.log('✅ Created: ' + event.summary);
    } catch (err) {
      console.error('❌ Failed: ' + event.summary + ' - ' + err.message);
    }
  });
  
  console.log('\n🎉 Calendar setup complete!');
  return 'Events created successfully!';
}
