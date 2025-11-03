from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import re
import traceback
import json

# --- Application bootstrap ---
app = Flask(__name__)

print("=== Starting notify.py ===")
print(f"Flask application: {app.name}")
print(f"Debug mode: {app.debug}")
print(
    f"Environment variables available to Flask (use with caution): "
    f"{json.dumps(dict(os.environ), indent=2)}"
)

# --- Load .env variables ---
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
print(f"Attempting to load .env from: {dotenv_path}")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path=dotenv_path)
    print(".env file found and loaded.")
else:
    print(".env file not found. Falling back to system environment variables (if set).")

# --- Configure CORS ---
VERCEL_URL = os.environ.get('VERCEL_URL')
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5001",
    "https://pr-study.com"
]
if VERCEL_URL:
    allowed_origins.append(f"https://{VERCEL_URL}")

print(f"CORS allowed origins: {allowed_origins}")
CORS(app, resources={
    r"/api/*": {
        "origins": allowed_origins,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# --- Secrets ---
TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")
print(f"TELEGRAM_BOT_TOKEN present: {'yes' if TOKEN else 'no'}")
print(f"TELEGRAM_CHAT_ID present: {'yes' if CHAT_ID else 'no'}")


@app.route('/api/test', methods=['GET'])
def test_route():
    """Simple health-check endpoint."""
    print("=== /api/test endpoint called ===")
    print(f"Request method: {request.method}")
    print(f"Request headers: {json.dumps(dict(request.headers), indent=2)}")
    return jsonify({"status": "ok", "message": "Test endpoint is working"}), 200


def escape_markdown_v2(text: str) -> str:
    """Escape special characters for Telegram MarkdownV2 formatting."""
    if not isinstance(text, str):
        text = str(text)
    escape_chars = r'_*[]()~`>#+-=|{}.!'
    pattern = f"([{re.escape(escape_chars)}])"
    return re.sub(pattern, r'\\\1', text)


@app.route('/api/notify', methods=['POST'])
def handle_notify():
    """Receive form submissions and forward them to Telegram."""
    print("=== /api/notify request received ===")
    print(f"Request method: {request.method}")
    print(f"Request headers: {json.dumps(dict(request.headers), indent=2)}")
    print(f"Request body: {json.dumps(request.json, indent=2) if request.is_json else 'Not JSON'}")
    print(f"Request origin: {request.headers.get('Origin')}")
    print(f"Request referer: {request.headers.get('Referer')}")

    if not TOKEN or not CHAT_ID:
        print("CONFIG ERROR: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing.")
        print("Check your .env file or server environment variables.")
        return jsonify({"status": "error", "message": "Server configuration error"}), 500

    if not request.is_json:
        print("Validation error: incoming request is not JSON.")
        return jsonify({"status": "error", "message": "Request payload must be JSON"}), 400

    data = request.json
    print(f"Parsed payload: {data}")

    name = data.get("name")
    phone = data.get("phone")
    email = data.get("email")
    subject = data.get("subject")
    message_text = data.get("message")
    university_name = data.get("universityName")

    message_lines = []
    form_type = "❓ Unknown form"

    # Contact form (full details)
    if email or subject or message_text:
        form_type = "📬 Contact form"
        if not name or not email or not message_text:
            print(
                "Validation error: missing fields for contact form "
                f"(name: {name}, email: {email}, message: {message_text})"
            )
            return jsonify({"status": "error", "message": "Name, email, and message are required"}), 400
        if name:
            message_lines.append(f"👤 Name: {escape_markdown_v2(name)}")
        if email:
            message_lines.append(f"✉️ Email: {escape_markdown_v2(email)}")
        if phone:
            message_lines.append(f"📞 Phone: {escape_markdown_v2(phone)}")
        if subject:
            message_lines.append(f"🏷️ Subject: {escape_markdown_v2(subject)}")
        if message_text:
            message_lines.append(f"\n📝 Message:\n{escape_markdown_v2(message_text)}")

    # Quick enquiry (name + phone)
    elif name and phone:
        form_type = "⚡ Quick enquiry"
        if not name or not phone:
            print(
                "Validation error: missing fields for quick enquiry "
                f"(name: {name}, phone: {phone})"
            )
            return jsonify({"status": "error", "message": "Name and phone are required"}), 400
        message_lines.append(f"👤 Name: {escape_markdown_v2(name)}")
        message_lines.append(f"📞 Phone: {escape_markdown_v2(phone)}")
        if university_name:
            message_lines.append(f"🎓 University: {escape_markdown_v2(university_name)}")

    else:
        print("Validation error: unable to determine form type from payload.")
        return jsonify(
            {"status": "error", "message": "Unable to determine form type or missing fields"}
        ), 400

    if not message_lines:
        print("Validation error: no data to compose a Telegram message.")
        return jsonify({"status": "error", "message": "No data to send"}), 400

    full_message = f"*{escape_markdown_v2(form_type)}*\n\n" + "\n".join(message_lines)
    print(f"--- Telegram message (MarkdownV2) ---\n{full_message}\n-----------------------------------")

    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": full_message, "parse_mode": "MarkdownV2"}

    try:
        print(f"Sending request to Telegram URL: {url}")
        response = requests.post(url, json=payload, timeout=15)
        print(f"Telegram response status: {response.status_code}")
        print(f"Telegram response body: {response.text}")
        response.raise_for_status()

        telegram_response_data = response.json()
        if telegram_response_data.get("ok"):
            print(f"SUCCESS: Message ({form_type}) delivered to chat {CHAT_ID}")
            return jsonify({"status": "ok", "message": "Notification delivered"})
        else:
            error_desc = telegram_response_data.get('description', 'Unknown Telegram error')
            print(f"ERROR returned by Telegram API: {error_desc}")
            return jsonify({"status": "error", "message": f"Telegram API error: {error_desc}"}), 500

    except requests.exceptions.Timeout:
        print(f"ERROR: Timeout while sending to Telegram ({form_type})")
        return jsonify({"status": "error", "message": "Notification dispatch timed out"}), 500
    except requests.exceptions.RequestException as exc:
        print(f"ERROR: Network problem while sending to Telegram ({form_type}): {exc}")
        return jsonify({"status": "error", "message": "Network error while sending notification"}), 500
    except Exception as exc:
        print(f"ERROR: Unexpected exception ({form_type}): {exc}")
        traceback.print_exc()
        return jsonify({"status": "error", "message": "Internal server error"}), 500


if __name__ == '__main__':
    if not TOKEN or not CHAT_ID:
        print("-" * 60)
        print("!!! STARTUP ABORTED !!!")
        print("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing.")
        print("1. Ensure a '.env' file exists in the project root (one level up from /api).")
        print("2. The .env file must contain:")
        print("   TELEGRAM_BOT_TOKEN=123456:ABCDEF...")
        print("   TELEGRAM_CHAT_ID=123456789")
        print("3. Confirm python-dotenv is installed (`pip install python-dotenv`).")
        print("-" * 60)
    else:
        print("-" * 60)
        print("Starting Flask development server...")
        print(f" - Flask app: {app.name}")
        print(f" - Debug mode: {app.debug}")
        print(f" - Using TOKEN: ...{TOKEN[-6:]}")
        print(f" - Using CHAT_ID: {CHAT_ID}")
        print(f" - CORS origins: {allowed_origins}")
        print(" - Server URL: http://0.0.0.0:5001 (or http://127.0.0.1:5001)")
        print("-" * 60)
        app.run(host='0.0.0.0', port=5001, debug=True)
