#!/usr/bin/osascript
-- Create calendar events in Apple Calendar (syncs to Google via CalDAV)
-- Run: osascript create-calendar-applescript.scpt

tell application "Calendar"
    -- Get the calendar
    set targetCalendar to calendar "rubenstips@gmail.com"
    
    -- Create Daily Workout Event (Recurring)
    set workoutEvent to make new event at end of events of targetCalendar with properties {¬
        summary:"💪 WORKOUT - No Excuses", ¬
        start date:date "Thursday, February 20, 2026 at 4:00:00 AM", ¬
        end date:date "Thursday, February 20, 2026 at 5:00:00 AM", ¬
        description:"David Goggins mode. Discipline = income.

Focus: Strength + cardio
Goal: 45-60 min intense workout
Location: Gym or home", ¬
        allday event:false}
    
    -- Set recurrence (daily until Dec 31, 2026)
    -- Note: AppleScript recurrence is limited, we'll create a week manually
    
    display notification "Created: WORKOUT event" with title "Calendar Setup"
    
    -- Create Upwork Event
    set upworkEvent to make new event at end of events of targetCalendar with properties {¬
        summary:"💰 Upwork - Apply to 10 Jobs", ¬
        start date:date "Thursday, February 20, 2026 at 5:00:00 AM", ¬
        end date:date "Thursday, February 20, 2026 at 6:00:00 AM", ¬
        description:"Goal: 10 applications/day minimum

Templates: business/Ruben-Upwork-Cover-Letters.md
Link: https://www.upwork.com/ab/find-work/

Track: node scripts/upwork-tracker.js add \"Job\" \"Company\" \"URL\" \"Rate\"", ¬
        allday event:false}
    
    display notification "Created: Upwork event" with title "Calendar Setup"
    
    -- Create CushionFoamz Event
    set cushionEvent to make new event at end of events of targetCalendar with properties {¬
        summary:"📱 CushionFoamz Marketing", ¬
        start date:date "Thursday, February 20, 2026 at 6:00:00 AM", ¬
        end date:date "Thursday, February 20, 2026 at 6:30:00 AM", ¬
        description:"Post 1-2 Reddit responses + check social media

Responses: CUSHIONFOAMZ-REDDIT-CONVERSATIONS.md

Links:
- Reddit DIY: https://www.reddit.com/r/DIY/
- Reddit Upholstery: https://www.reddit.com/r/upholstery/
- CushionFoamz: https://cushionfoamz.com", ¬
        allday event:false}
    
    display notification "Created: CushionFoamz event" with title "Calendar Setup"
    
    -- Create Evening Review Event
    set reviewEvent to make new event at end of events of targetCalendar with properties {¬
        summary:"🌙 Daily Review + Tomorrow Prep", ¬
        start date:date "Thursday, February 20, 2026 at 9:00:00 PM", ¬
        end date:date "Thursday, February 20, 2026 at 10:00:00 PM", ¬
        description:"Set 3 priorities for next day

- Review Johnny 5's daily output
- Check calendar for tomorrow
- Set 3 main priorities
- Prepare materials needed", ¬
        allday event:false}
    
    display notification "Created: Evening Review event" with title "Calendar Setup"
    
    -- Create weekly events for next week
    
    -- Monday: Client Work
    set monEvent to make new event at end of events of targetCalendar with properties {¬
        summary:"🔥 Client Work / Sales Calls", ¬
        start date:date "Monday, February 24, 2026 at 11:00:00 AM", ¬
        end date:date "Monday, February 24, 2026 at 2:30:00 PM", ¬
        description:"Focus: Closing deals, client calls, proposal reviews

Priority: Revenue-generating activities", ¬
        allday event:false}
    
    -- Tuesday: Project Delivery
    set tueEvent to make new event at end of events of targetCalendar with properties {¬
        summary:"⚡ Client Work / Project Delivery", ¬
        start date:date "Tuesday, February 25, 2026 at 10:00:00 AM", ¬
        end date:date "Tuesday, February 25, 2026 at 2:30:00 PM", ¬
        description:"Focus: Delivering work, client updates, billing", ¬
        allday event:false}
    
    -- Wednesday: Prospecting
    set wedEvent to make new event at end of events of targetCalendar with properties {¬
        summary:"🎯 Prospecting / Cold Outreach", ¬
        start date:date "Wednesday, February 26, 2026 at 9:30:00 AM", ¬
        end date:date "Wednesday, February 26, 2026 at 1:30:00 PM", ¬
        description:"Focus: Sending audits, follow-up calls, new lead gen

Link: https://app.rankingsb.com/prospecting/add-prospect

Goal: 5 audits sent, 5 follow-up calls", ¬
        allday event:false}
    
    -- Thursday: Content Creation
    set thuEvent to make new event at end of events of targetCalendar with properties {¬
        summary:"📝 Content Creation / Long-term Assets", ¬
        start date:date "Thursday, February 27, 2026 at 9:30:00 AM", ¬
        end date:date "Thursday, February 27, 2026 at 1:30:00 PM", ¬
        description:"Focus: Blog posts, social media, SEO content

- Review Johnny 5 published content
- Schedule social media posts
- Plan next week's content", ¬
        allday event:false}
    
    -- Friday: Week Review
    set friEvent to make new event at end of events of targetCalendar with properties {¬
        summary:"📊 Week Review + Planning", ¬
        start date:date "Friday, February 21, 2026 at 9:30:00 AM", ¬
        end date:date "Friday, February 21, 2026 at 11:30:00 AM", ¬
        description:"Review week's results with Johnny 5

- Check Upwork tracker summary
- Review CushionFoamz engagement
- Update sales pipelines
- Send invoices
- Plan next week", ¬
        allday event:false}
    
    display notification "Created all weekly work blocks" with title "Calendar Setup"
    
end tell

display notification "✅ All calendar events created! Check your Calendar app." with title "Calendar Setup Complete"
