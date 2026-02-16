import sys

def verify_discipline():
    try:
        with open('test.user.js', 'r') as f:
            code = f.read()

        # Rule 1: Target URL sahi hona chahiye
        if "mt5trial16.exwebterm.com" not in code:
            print("❌ DISCIPLINE ERROR: Target URL changed!")
            sys.exit(1)

        # Rule 2: Trade button hide hona chahiye
        if "button.button-trade" not in code or "display: none" not in code:
            print("❌ DISCIPLINE ERROR: Trade buttons must be hidden!")
            sys.exit(1)

        # Rule 3: Toolbox (Balance) hide hona chahiye
        if ".toolbox" not in code:
            print("❌ DISCIPLINE ERROR: Toolbox must be hidden!")
            sys.exit(1)

        print("✅ DISCIPLINE APPROVED: Rules followed.")
        
    except Exception as e:
        print(f"⚠️ Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    verify_discipline()
