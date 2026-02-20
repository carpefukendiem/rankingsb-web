# How to Whitelist Locations in GHL Private Integration

## 🔧 Step-by-Step Instructions

### Method 1: During Integration Creation (Recommended)

When you create the Private Integration, there's a **Locations** section:

1. After entering the integration name/description
2. Look for **"Locations"** or **"Allowed Locations"** section
3. Click **+ Add Location** or toggle on locations
4. Search/select:
   - **Rankingsb** (ID: `yrvzyq2jB2me4Z23PFxP`)
   - **CushionFoamz** (ID: `RaVrmoQzcKFJjHsc9Kxh`)
5. Click **Save**

---

### Method 2: Edit Existing Integration

If you already created the integration:

1. Go to: https://app.rankingsb.com/settings/integrations/private
2. Find **"Johnny 5 API"** (or whatever you named it)
3. Click **Edit** (pencil icon)
4. Scroll to **Locations** section
5. Click **+ Add Location**
6. Select **Rankingsb** and **CushionFoamz**
7. Click **Save**

---

### Method 3: Agency-Level Access (Best)

1. Go to **Agency Settings** (top menu)
2. Click **Integrations** → **Private Integrations**
3. Find your integration
4. Click **Manage Access**
5. Toggle **"All Locations"** OR select specific ones:
   - ☑️ Rankingsb
   - ☑️ CushionFoamz
6. Click **Save Changes**

---

## ✅ Verify Whitelisting

After whitelisting, test the token again:

```bash
curl -H "Authorization: Bearer pit-2e5816e3-96f7-48ec-9caa-64fb68554766" \
     -H "Version: 2021-07-28" \
     "https://services.leadconnectorhq.com/locations/yrvzyq2jB2me4Z23PFxP"
```

Should return location details instead of 404.

---

## 🎯 Quick Fix

**Easiest path:**
1. Go to https://app.rankingsb.com/settings/integrations/private
2. Click **Edit** on "Johnny 5 API"
3. Find **"Allowed Locations"** 
4. Add both locations
5. Save
6. Test again

---

## 🚨 If You Can't Find It

Some GHL accounts have different UI. Try this:

1. **SaaS Mode** users: Go to **Agency View** → **Settings** → **API**
2. **Sub-account** tokens: Go to the sub-account → **Settings** → **API**

**Alternative:** Create a new integration and look carefully for the "Locations" dropdown during setup.

---

**Once whitelisted, the token will work and I can pull Sal's data immediately.**
