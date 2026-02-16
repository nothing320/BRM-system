import sys
from datetime import datetime

def verify_time_lock():
    # 🔓 Yahan wo date likhein jab aap lock kholna chahte hain
    # (Year, Month, Day)
    unlock_date = datetime(2026, 1, 1) 
    
    current_date = datetime.now()

    if current_date < unlock_date:
        days_left = (unlock_date - current_date).days
        print(f"❌ SURGICAL LOCK ACTIVE!")
        print(f"Usman bhai, abhi {days_left} din baqi hain. Trading discipline follow karein.")
        print(f"Unlock Date: {unlock_date.strftime('%d %B %Y')}")
        sys.exit(1) # Ye merge ko block kar dega
    else:
        print("✅ TIME LOCK EXPIRED: Aap ab edit kar sakte hain.")
        sys.exit(0) # Ye merge allow kar dega

if __name__ == "__main__":
    verify_time_lock()
