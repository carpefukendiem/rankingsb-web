-- Johnny 5 Voice Interface
-- Native macOS AppleScript for instant voice communication
-- Usage: Save as Application, assign hotkey via System Preferences

-- Enable dictation first:
-- System Preferences > Keyboard > Dictation > ON

-- Main handler
on run
	display notification "🎤 Press Cmd+Shift+J anytime to talk to Johnny 5" with title "Johnny 5 Voice"
end run

-- Voice input handler
on voiceInput()
	try
		-- Activate dictation
		tell application "System Events"
			key code 63 using command down -- Fn key twice equivalent
		end tell
		
		-- Wait for dictation to complete
		delay 0.5
		
		-- Get the dictated text (this is simulated - in reality we'd need to capture it)
		-- For now, this activates dictation in the current app
		
		display notification "🎤 Speak now..." with title "Johnny 5"
		
		-- In a real implementation, we'd:
		-- 1. Record audio using QuickTime or sox
		-- 2. Send to Whisper for transcription
		-- 3. Send text to Johnny 5
		-- 4. Play voice response
		
	on error errMsg
		display notification "❌ Error: " & errMsg with title "Johnny 5"
	end try
end voiceInput

-- Alternative: Use this with a global hotkey app like "BetterTouchTool" or "Keyboard Maestro"
-- Hotkey: Cmd+Shift+J
-- Action: Run this script
