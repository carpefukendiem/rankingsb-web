# TAILSCALE REMOTE ACCESS
## Enabled & Configured | February 16, 2026

---

## ✅ STATUS: ENABLED

**Config updated:** `~/.openclaw/openclaw.json`

**Changes made:**
- Mode: `off` → `userspace`
- Accept DNS: `true`
- Exit node: Not advertised (for security)

---

## 🚀 START TAILSCALE

### Step 1: Install Tailscale (if not installed)

```bash
# Install Tailscale
brew install tailscale

# Or download from: https://tailscale.com/download
```

### Step 2: Start Tailscale

```bash
# Start Tailscale daemon
sudo tailscaled

# Or as service
sudo brew services start tailscale
```

### Step 3: Authenticate

```bash
# Login to Tailscale
tailscale up

# This opens browser - login with your account
# (Google, Microsoft, GitHub, etc.)
```

### Step 4: Get Your Tailscale IP

```bash
# Show Tailscale IP
tailscale ip -4

# Output example: 100.x.x.x
```

**Your Tailscale IP:** ________________ (run command above)

---

## 💻 LAPTOP ACCESS

### From Your Laptop (Anywhere):

1. **Install Tailscale on laptop**
   - Windows/Mac/Linux: https://tailscale.com/download
   
2. **Login with same account**
   - Must be same account as iMac
   
3. **Access OpenClaw:**
   ```
   http://100.x.x.x:18789
   ```
   (Replace with your Tailscale IP)

4. **Or SSH:**
   ```bash
   ssh rubenruiz@100.x.x.x
   ```

---

## 🔐 SECURITY

### What's Protected:
- ✅ End-to-end encryption
- ✅ No open ports on router
- ✅ No public IP exposure
- ✅ Device authorization required

### Access Control:
```bash
# See connected devices
tailscale status

# Revoke device access
tailscale revoke [DEVICE_NAME]

# Disable exit node (prevent others using your connection)
tailscale up --advertise-exit-node=false
```

---

## 🧪 TEST CONNECTION

### On iMac:
```bash
# Verify Tailscale running
tailscale status

# Should show: "Connected"
```

### On Laptop:
```bash
# Ping iMac via Tailscale
ping 100.x.x.x

# Should respond successfully
```

---

## 📱 ALTERNATIVE ACCESS METHODS

### Option A: Direct Browser (Tailscale)
```
https://100.x.x.x:18789
```

### Option B: SSH + CLI
```bash
ssh rubenruiz@100.x.x.x
openclaw chat
```

### Option C: Tailscale App
1. Install Tailscale app on phone/laptop
2. See iMac in device list
3. Click to connect

---

## 🔧 TROUBLESHOOTING

### "Connection refused"
```bash
# Check OpenClaw gateway
openclaw gateway status

# Restart if needed
openclaw gateway restart
```

### "Cannot ping"
```bash
# Check Tailscale status
tailscale status

# Re-authenticate if needed
tailscale up --force-reauth
```

### "DNS not resolving"
```bash
# Accept DNS in config (already done)
tailscale up --accept-dns=true
```

---

## 🎯 USAGE SCENARIOS

### At Coffee Shop:
1. Open laptop
2. Connect to WiFi
3. Tailscale auto-connects
4. Browse to `http://100.x.x.x:18789`
5. Chat with me like you're at home

### On Phone:
1. Install Tailscale app
2. See iMac in device list
3. Tap to connect
4. Open browser to `http://100.x.x.x:18789`

### Traveling:
1. Laptop anywhere in world
2. Same Tailscale connection
3. Access all your files/services
4. Secure, encrypted, fast

---

## 📋 YOUR ACCESS DETAILS

**iMac Tailscale IP:** `100.x.x.x` (get with `tailscale ip -4`)

**OpenClaw Port:** `18789`

**Full URL:** `http://100.x.x.x:18789`

**SSH:** `ssh rubenruiz@100.x.x.x`

---

## ⚡ QUICK COMMANDS

```bash
# Check status
tailscale status

# Get IP
tailscale ip -4

# Restart
tailscale down && tailscale up

# View logs
tailscale logs

# Update
tailscale update
```

---

## ✅ NEXT STEPS

**You do:**
1. Install Tailscale: `brew install tailscale`
2. Start: `sudo tailscale up`
3. Authenticate in browser
4. Note your Tailscale IP
5. Test from laptop

**Done!** Access OpenClaw from anywhere in the world.

---

*Tailscale enabled in config: February 16, 2026*  
*Status: Awaiting installation*