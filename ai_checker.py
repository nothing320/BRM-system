import sys
import requests
from datetime import datetime

def get_internet_time():
    # 2 alag sources se date check karein taake failure na ho
    urls = ["http://worldtimeapi.org/api/timezone/Etc/UTC", "https://www.google.com"]
    for url in urls:
        try:
            res = requests.get(url, timeout=10)
            if "worldtimeapi" in url and res.status_code == 200:
                return datetime.strptime(res.json()['datetime'][:10], "%Y-%m-%d")
            elif "google" in url:
                return datetime.strptime(res.headers.get('Date')[5:16], "%d %b %Y")
        except:
            continue
    return None

def verify_discipline():
    # 🔒 TEST LOCK: Is date ko aaj se aage rakha hai taake lock show ho
    unlock_date = datetime(2026, 1, 1) 
    
    current_date = get_internet_time()

    if current_date is None:
        print("❌ SECURITY ALERT: Internet se date verify nahi ho saki. Access Blocked!")
        sys.exit(1)

    print(f"📅 Today's Date: {current_date.strftime('%Y-%m-%d')}")
    print(f"🔓 Unlock Date: {unlock_date.strftime('%Y-%m-%d')}")

    if current_date < unlock_date:
        days_left = (unlock_date - current_date).days
        print("-" * 30)
        print(f"❌ SURGICAL LOCK ACTIVE!")
        print(f"Usman bhai, abhi {days_left} din baqi hain. Trading discipline!")
        print("-" * 30)
        sys.exit(1) # Ye GitHub par Red Cross dikhayega
    else:
        print("✅ ACCESS GRANTED: Discipline maintained.")
        sys.exit(0)

if __name__ == "__main__":
    verify_discipline()
