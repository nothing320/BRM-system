import os
import sys
import google.generativeai as genai

# Secret se API key uthana
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

def verify_discipline():
    try:
        with open('test.user.js', 'r') as f:
            code = f.read()

        # Stable model version use kar rahe hain
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
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

        response = model.generate_content(prompt)
        verdict = response.text.strip()

        if "REJECTED" in verdict:
            print("❌ AI GUARD: Discipline Violation! Merge blocked.")
            sys.exit(1)
        else:
            print("✅ AI GUARD: Discipline Approved.")

    except Exception as e:
        print(f"⚠️ Error: {str(e)}")
        # Agar AI down ho toh safety ke liye block rakhen
        sys.exit(1)

if __name__ == "__main__":
    verify_discipline()
