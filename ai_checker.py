import os
import sys
from google import genai

def verify_discipline():
    try:
        # Secret se API key uthana
        client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
        
        with open('test.user.js', 'r') as f:
            code = f.read()

        prompt = f"""
        You are Usman's Risk Manager. 
        Analyze this code and ensure it STRICTLY follows these rules:
        1. Must target 'mt5trial16.exwebterm.com'.
        2. Must have CSS to hide 'Trade' and 'Toolbox' buttons (display: none).
        3. Must have a setInterval loop for safety.

        If any rule is violated, respond ONLY with 'REJECTED'.
        If it is perfectly safe, respond ONLY with 'APPROVED'.

        CODE:
        {code}
        """

        # Stable model for Free Tier
        response = client.models.generate_content(
            model="gemini-1.5-flash", 
            contents=prompt
        )
        
        verdict = response.text.strip()

        if "REJECTED" in verdict:
            print("❌ AI GUARD: Discipline Violation! Merge blocked.")
            sys.exit(1)
        else:
            print("✅ AI GUARD: Discipline Approved.")

    except Exception as e:
        print(f"⚠️ Error: {str(e)}")
        # Safety: Agar AI down ho ya limit khatam ho, toh block rakhen
        sys.exit(1)

if __name__ == "__main__":
    verify_discipline()
