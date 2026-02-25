#!/usr/bin/env python3
"""
WEBHOOK SERVER - For Twilio SMS Replies
Simple Flask/FastAPI server to receive and process incoming SMS replies.
"""

import os
import sys
import json
import logging
from datetime import datetime

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv

# Try to import Flask, fallback to basic HTTP server
try:
    from flask import Flask, request, jsonify
    FLASK_AVAILABLE = True
except ImportError:
    FLASK_AVAILABLE = False
    from http.server import HTTPServer, BaseHTTPRequestHandler
    from urllib.parse import parse_qs

from scripts.closer import ReplyHandler

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/webhook.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('webhook')

# Initialize reply handler
reply_handler = ReplyHandler()

if FLASK_AVAILABLE:
    app = Flask(__name__)
    
    @app.route('/webhook/sms-reply', methods=['POST'])
    def handle_sms_reply():
        """Handle incoming SMS reply from Twilio."""
        try:
            # Get Twilio request data
            from_number = request.form.get('From', '')
            to_number = request.form.get('To', '')
            message_body = request.form.get('Body', '')
            message_sid = request.form.get('MessageSid', '')
            
            logger.info(f"Received SMS reply from {from_number}")
            
            # Process the reply
            result = reply_handler.process_reply(
                from_number=from_number,
                message_body=message_body,
                message_sid=message_sid
            )
            
            # Return TwiML response (empty, no reply needed)
            twiml = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>'
            
            return twiml, 200, {'Content-Type': 'text/xml'}
            
        except Exception as e:
            logger.error(f"Error handling SMS reply: {e}")
            return 'Error', 500
    
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint."""
        return jsonify({'status': 'ok', 'timestamp': datetime.now().isoformat()})
    
    @app.route('/stats', methods=['GET'])
    def get_stats():
        """Get current stats."""
        try:
            # Count files in data directories
            leads_count = len([f for f in os.listdir('data/leads') if f.endswith('.csv')])
            
            # Get today's counts
            today = datetime.now().strftime('%Y-%m-%d')
            
            sms_count = 0
            replies_count = 0
            
            sms_file = f'data/crm/sms_log_{today}.csv'
            if os.path.exists(sms_file):
                with open(sms_file) as f:
                    sms_count = len(f.readlines()) - 1
                    
            replies_file = f'data/crm/replies_{today}.csv'
            if os.path.exists(replies_file):
                with open(replies_file) as f:
                    replies_count = len(f.readlines()) - 1
            
            return jsonify({
                'status': 'ok',
                'leads_files': leads_count,
                'today_sms_sent': sms_count,
                'today_replies': replies_count,
                'timestamp': datetime.now().isoformat()
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

else:
    # Basic HTTP server fallback
    class WebhookHandler(BaseHTTPRequestHandler):
        def do_POST(self):
            if self.path == '/webhook/sms-reply':
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length).decode('utf-8')
                
                # Parse form data
                params = parse_qs(post_data)
                
                from_number = params.get('From', [''])[0]
                message_body = params.get('Body', [''])[0]
                message_sid = params.get('MessageSid', [''])[0]
                
                logger.info(f"Received SMS reply from {from_number}")
                
                try:
                    reply_handler.process_reply(from_number, message_body, message_sid)
                except Exception as e:
                    logger.error(f"Error: {e}")
                
                # Return TwiML
                self.send_response(200)
                self.send_header('Content-Type', 'text/xml')
                self.end_headers()
                self.wfile.write(b'<?xml version="1.0" encoding="UTF-8"?><Response></Response>')
            else:
                self.send_response(404)
                self.end_headers()
                
        def do_GET(self):
            if self.path == '/health':
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = {'status': 'ok', 'timestamp': datetime.now().isoformat()}
                self.wfile.write(json.dumps(response).encode())
            else:
                self.send_response(404)
                self.end_headers()
                
        def log_message(self, format, *args):
            logger.info(format % args)


def run_flask_server(port=5000):
    """Run Flask development server."""
    logger.info(f"Starting Flask webhook server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)


def run_basic_server(port=5000):
    """Run basic HTTP server."""
    logger.info(f"Starting basic webhook server on port {port}")
    server = HTTPServer(('0.0.0.0', port), WebhookHandler)
    server.serve_forever()


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Webhook server for SMS replies')
    parser.add_argument('--port', type=int, default=5000, help='Port to listen on')
    parser.add_argument('--basic', action='store_true', help='Use basic HTTP server (no Flask)')
    
    args = parser.parse_args()
    
    os.makedirs('logs', exist_ok=True)
    
    if FLASK_AVAILABLE and not args.basic:
        run_flask_server(args.port)
    else:
        run_basic_server(args.port)


if __name__ == '__main__':
    main()
