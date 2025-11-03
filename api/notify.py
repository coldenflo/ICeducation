from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import re
import traceback
import json

# --- Инициализация приложения ---
app = Flask(__name__)

# --- Логирование старта приложения ---
print("=== Запуск приложения notify.py ===")
print(f"Flask App Name: {app.name}")
print(f"Режим отладки: {app.debug}")
print(f"Переменные окружения: {json.dumps(dict(os.environ), indent=2)}")  # Логируем все переменные окружения (осторожно с секретами)

# --- ЗАГРУЗКА .env ---
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
print(f"Попытка загрузки .env из: {dotenv_path}")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path=dotenv_path)
    print(".env файл найден и загружен.")
else:
    print("Файл .env не найден в корне проекта, используются системные переменные окружения (если заданы).")

# --- Настройка CORS ---
VERCEL_URL = os.environ.get('VERCEL_URL')
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5001",
    "https://viva-tour-education.vercel.app"
]
if VERCEL_URL:
    allowed_origins.append(f"https://{VERCEL_URL}")

print(f"Настройка CORS для origins: {allowed_origins}")
CORS(app, resources={
    r"/api/*": {
        "origins": allowed_origins,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# --- Получение секретов ---
TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")
print(f"TELEGRAM_BOT_TOKEN: {'Set' if TOKEN else 'Not Set'}")
print(f"TELEGRAM_CHAT_ID: {'Set' if CHAT_ID else 'Not Set'}")

# --- Тестовый маршрут для проверки доступности ---
@app.route('/api/test', methods=['GET'])
def test_route():
    print("=== Тестовый маршрут /api/test вызван ===")
    print(f"Метод запроса: {request.method}")
    print(f"Заголовки запроса: {json.dumps(dict(request.headers), indent=2)}")
    return jsonify({"status": "ok", "message": "Тестовый маршрут работает"}), 200

# --- Функция экранирования MarkdownV2 ---
def escape_markdown_v2(text: str) -> str:
    """Экранирует специальные символы для Telegram MarkdownV2."""
    if not isinstance(text, str):
        text = str(text)
    escape_chars = r'_*[]()~`>#+-=|{}.!'
    pattern = f"([{re.escape(escape_chars)}])"
    return re.sub(pattern, r'\\\1', text)

# --- Основной обработчик API ---
@app.route('/api/notify', methods=['POST'])
def handle_notify():
    print("=== Запрос на /api/notify получен ===")
    print(f"Метод запроса: {request.method}")
    print(f"Заголовки запроса: {json.dumps(dict(request.headers), indent=2)}")
    print(f"Тело запроса: {json.dumps(request.json, indent=2) if request.is_json else 'Не JSON'}")
    print(f"Origin запроса: {request.headers.get('Origin')}")
    print(f"Referer запроса: {request.headers.get('Referer')}")

    # Проверка наличия токенов
    if not TOKEN or not CHAT_ID:
        print("ОШИБКА КОНФИГУРАЦИИ: Переменные TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не найдены!")
        print("Проверьте файл .env или переменные окружения сервера.")
        return jsonify({"status": "error", "message": "Ошибка конфигурации сервера"}), 500

    # Проверка типа контента
    if not request.is_json:
        print("Ошибка: Запрос не в формате JSON")
        return jsonify({"status": "error", "message": "Запрос должен быть в формате JSON"}), 400

    data = request.json
    print(f"Получены данные: {data}")

    # Извлечение данных из JSON
    name = data.get("name")
    phone = data.get("phone")
    email = data.get("email")
    subject = data.get("subject")
    message_text = data.get("message")
    university_name = data.get("universityName")

    message_lines = []
    form_type = "❓ Неизвестная форма"

    # Определение типа формы и валидация
    if email or subject or message_text:
        form_type = "📬 Контактная форма"
        if not name or not email or not message_text:
            print(f"Ошибка валидации: Не хватает полей для контактной формы (Имя: {name}, Email: {email}, Сообщение: {message_text})")
            return jsonify({"status": "error", "message": "Необходимо указать имя, email и сообщение"}), 400
        if name: message_lines.append(f"👤 Имя: {escape_markdown_v2(name)}")
        if email: message_lines.append(f"✉️ Email: {escape_markdown_v2(email)}")
        if phone: message_lines.append(f"📞 Телефон: {escape_markdown_v2(phone)}")
        if subject: message_lines.append(f"🏷️ Тема: {escape_markdown_v2(subject)}")
        if message_text: message_lines.append(f"\n📝 Сообщение:\n{escape_markdown_v2(message_text)}")

    elif name and phone:
        form_type = "⚡ Быстрая заявка"
        if not name or not phone:
            print(f"Ошибка валидации: Не хватает полей для быстрой заявки (Имя: {name}, Телефон: {phone})")
            return jsonify({"status": "error", "message": "Необходимо указать имя и телефон"}), 400
        message_lines.append(f"👤 Имя: {escape_markdown_v2(name)}")
        message_lines.append(f"📞 Телефон: {escape_markdown_v2(phone)}")
        if university_name:
            message_lines.append(f"🎓 Университет: {escape_markdown_v2(university_name)}")

    else:
        print("Ошибка: Не удалось определить тип формы по полученным данным.")
        return jsonify({"status": "error", "message": "Не удалось определить тип формы или не хватает полей"}), 400

    if not message_lines:
        print("Ошибка: Нет данных для формирования сообщения.")
        return jsonify({"status": "error", "message": "Нет данных для отправки"}), 400

    # Собираем финальное сообщение
    full_message = f"*{escape_markdown_v2(form_type)}*\n\n" + "\n".join(message_lines)
    print(f"--- Сообщение для Telegram (MarkdownV2) ---:\n{full_message}\n----------------------------------------")

    # Отправка в Telegram
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": full_message, "parse_mode": "MarkdownV2"}

    try:
        print(f"Отправка запроса на URL: {url}")
        response = requests.post(url, json=payload, timeout=15)
        print(f"Статус ответа от Telegram: {response.status_code}")
        print(f"Тело ответа от Telegram: {response.text}")
        response.raise_for_status()

        telegram_response_data = response.json()
        if telegram_response_data.get("ok"):
            print(f"УСПЕХ: Сообщение успешно отправлено ({form_type}) в чат {CHAT_ID}")
            return jsonify({"status": "ok", "message": "Уведомление отправлено"})
        else:
            error_desc = telegram_response_data.get('description', 'Unknown Telegram error')
            print(f"ОШИБКА от Telegram API: {error_desc}")
            return jsonify({"status": "error", "message": f"Ошибка Telegram: {error_desc}"}), 500

    except requests.exceptions.Timeout:
        print(f"ОШИБКА: Таймаут при отправке в Telegram ({form_type})")
        return jsonify({"status": "error", "message": "Превышено время ожидания отправки уведомления"}), 500
    except requests.exceptions.RequestException as e:
        print(f"ОШИБКА: Сетевая ошибка при отправке в Telegram ({form_type}): {e}")
        return jsonify({"status": "error", "message": "Сетевая ошибка при отправке уведомления"}), 500
    except Exception as e:
        print(f"ОШИБКА: Непредвиденная ошибка ({form_type}): {e}")
        traceback.print_exc()
        return jsonify({"status": "error", "message": "Внутренняя ошибка сервера"}), 500

# --- Блок для локального запуска ---
if __name__ == '__main__':
    if not TOKEN or not CHAT_ID:
        print("-" * 60)
        print("!!! ВНИМАНИЕ: ЗАПУСК НЕВОЗМОЖЕН !!!")
        print("Не установлены переменные окружения TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID.")
        print("1. Убедитесь, что в корне проекта (папка 'project') есть файл '.env'.")
        print("2. В файле .env должны быть строки вида:")
        print("   TELEGRAM_BOT_TOKEN=123456:ABCDEF...")
        print("   TELEGRAM_CHAT_ID=123456789")
        print("3. Убедитесь, что библиотека python-dotenv установлена (`pip install python-dotenv`)")
        print("-" * 60)
    else:
        print("-" * 60)
        print("Запуск Flask сервера для ЛОКАЛЬНОЙ разработки...")
        print(f" - Flask App Name: {app.name}")
        print(f" - Режим отладки (Debug Mode): {app.debug}")
        print(f" - Используется TOKEN: ...{TOKEN[-6:]}")
        print(f" - Используется CHAT_ID: {CHAT_ID}")
        print(f" - Разрешенные Origins для CORS: {allowed_origins}")
        print(f" - Сервер будет доступен на http://0.0.0.0:5001")
        print(f" - Также доступен по адресу: http://127.0.0.1:5001")
        print("-" * 60)
        app.run(host='0.0.0.0', port=5001, debug=True)