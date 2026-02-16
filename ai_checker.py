import sys

def verify_discipline():
    try:
        with open('test.user.js', 'r') as f:
            code = f.read()

        # Rule 1: Trial 16 URL check
        if "mt5trial16.exwebterm.com" not in code:
            print("❌ DISCIPLINE ERROR: Target URL changed!")
            sys.exit(1)

        # Rule 2: Trade buttons (Naye aur purane dono names check karega)
        trade_indicators = ["button.button-trade", "[title=\"Trade\"]", "trade-button", "svelte-liwf8ix"]
        if not any(x in code for x in trade_indicators) or "display: none" not in code:
            print("❌ DISCIPLINE ERROR: Trade buttons are not locked!")
            sys.exit(1)

        # Rule 3: Toolbox/Panel check
        toolbox_indicators = [".toolbox", "terminal-panel", "bottom-panel"]
        if not any(x in code for x in toolbox_indicators):
            print("❌ DISCIPLINE ERROR: Toolbox/Panel check missing!")
            sys.exit(1)

        print("✅ DISCIPLINE APPROVED: Usman's Surgical Lock is Active.")
        
    except Exception as e:
        print(f"⚠️ Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    verify_discipline()
