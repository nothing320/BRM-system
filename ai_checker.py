import sys
import requests
from datetime import datetime

def get_internet_time():
    """Internet se live UTC date nikalne ke liye"""
    try:
        # Google ya WorldTimeAPI se date confirm karna
        response = requests.get("http://worldtimeapi.org/api/timezone/Etc/UTC", timeout=10)
        if response.status_code == 200:
            data = response.json()
            return datetime.strptime(data['datetime'][:10], "%Y-%m-%d")
        return None
    except:
        return None

def verify_discipline():
    # 🔓 YAHAN APNI UNLOCK DATE LIKHEIN (Year, Month, Day)
    unlock_date = datetime(2026, 1, 1) 
    
    print("🔍 System: Verifying discipline status via Internet...")
    current_date = get_internet_time()

    if current_date is None:
        print("❌ CRITICAL ERROR: No Internet connection or API down.")
        print("Discipline Protocol: Lock cannot be bypassed offline.")
        sys.exit(1) # Block the action

    if current_date < unlock_date:
        days_remaining = (unlock_date - current_date).days
        print("-" * 40)
        print(f"❌ SURGICAL LOCK ACTIVE!")
        print(f"Usman bhai, abhi {days_remaining} din baqi hain.")
        print(f"Irade mazboot rakhein. Unlock Date: {unlock_date.strftime('%d %B %Y')}")
        print("-" * 40)
        sys.exit(1) # Merge/Push fail kar dega
    else:
        print("✅ DISCIPLINE MAINTAINED: Time Lock Expired. Access Granted.")
        sys.exit(0) # Merge/Push allow kar dega

if __name__ == "__main__":
    verify_discipline()
