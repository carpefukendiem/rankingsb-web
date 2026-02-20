# Sal Daily Activity Report — GHL Monitoring

## 📊 Report Structure

**Delivery:** Nightly at ~6 PM PST  
**Channel:** #nightly-brief (Discord)  
**Format:** Markdown summary + pipeline changes

---

## 🔍 What We Track

### 1. Calls Made
- Manual calls logged in GHL
- Call duration
- Outcomes (no answer, voicemail, conversation)

### 2. Appointments Scheduled
- Audit calls booked
- Date/time of appointments
- Contact info

### 3. Pipeline Movements
| From Stage | To Stage | Contact | Value |
|------------|----------|---------|-------|
| Targeted | Contacted | [Business Name] | — |
| Contacted | Audit Scheduled | [Business Name] | — |
| Audit Scheduled | Proposal Sent | [Business Name] | $1,995 |

### 4. New Contacts Created
- Leads added from prospecting
- Source (cold call, referral, etc.)

### 5. Activity Summary
```
📞 Calls Made: XX
📅 Appointments: XX
📝 New Contacts: XX
🎯 Pipeline Moves: XX
💰 Deals Closed: XX ($X,XXX)
```

---

## 🛠️ API Endpoints Needed

```
# Get Sal's activities
GET /v1/locations/{locationId}/activities?userId={salUserId}&date={YYYY-MM-DD}

# Get pipeline changes
GET /v1/locations/{locationId}/opportunities?updatedAfter={timestamp}

# Get calls made
GET /v1/locations/{locationId}/calls?userId={salUserId}&date={YYYY-MM-DD}

# Get appointments
GET /v1/locations/{locationId}/appointments?userId={salUserId}&date={YYYY-MM-DD}
```

---

## 📅 Setup Steps

1. **Get new GHL API token** (current one expired)
2. **Find Sal's user ID** in Rankingsb location
3. **Create cron job** at 6 PM daily
4. **Store webhook** for real-time alerts (optional)

---

## 🔔 Real-Time Alerts (Optional)

**Hot Lead Alert:**
> 🔥 **HOT LEAD!** Sal moved **[Business Name]** to **Audit Scheduled**
> 📞 Contact: (XXX) XXX-XXXX | 💰 Potential: $1,995

**Deal Closed Alert:**
> 🎉 **DEAL CLOSED!** Sal closed **[Business Name]** — **$1,995**
> 🏆 Total today: $X,XXX | Week: $X,XXX

---

## 📋 Sample Daily Report

```
## 📊 Sal's Daily Activity — Friday, Feb 20

### 📞 Calls Made: 23
- 15 No answer
- 5 Voicemail left
- 3 Conversations (13% connect rate)

### 📅 Appointments: 2
1. **Anderson Electric** — Mon 2/24 10:00 AM
2. **Coastal HVAC** — Tue 2/25 2:00 PM

### 🎯 Pipeline Moves: 3
| Contact | From | To | Time |
|---------|------|-----|------|
| Brady Electric | Targeted | Contacted | 9:15 AM |
| Dunn Electric | Contacted | Audit Scheduled | 11:30 AM |
| Sullivan Electric | Targeted | Contacted | 2:45 PM |

### 📝 New Contacts: 5
Added from cold calling

### 💰 Deals Closed: 0
**Week-to-date:** 0 closes | **Goal:** 2 by Sunday

---
*Next report: Saturday 6 PM*
```

---

## 🔧 Implementation File

`scripts/ghl-sal-monitor.js` — Will fetch data and post to Discord

---

*Created: Feb 20, 2026*  
*Status: Pending GHL API token refresh*
