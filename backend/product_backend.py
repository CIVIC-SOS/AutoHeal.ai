import sys
import httpx
import aegis_agent

# Avoid unicode encode errors on Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def checkout():
    """ Process checkout by sending an order to the backend. """
    print("\n[Product Backend] User clicked Checkout. Initiating payment...")
    
    # legacy cart payload format
    old_cart_payload = {
        "user_id": 12345,
        "amount": 99.00
    }
    
    target_url = "http://127.0.0.1:8000/pay"

    try:
        response = httpx.post(target_url, json=old_cart_payload)
        response.raise_for_status() 
        
        print("[Product Backend] Order placed successfully!")
        return response.json()
        
    except httpx.HTTPStatusError as e:
        # gracefully handle 400 errors
        if e.response.status_code == 400:
            error_details = e.response.json().get('detail', e.response.text)
            print("\n[Product Backend] CAUGHT 400 ERROR from Vendor!")
            print(f"Error Message: {error_details}")
            
            # hand off to remediation agent
            print("\n[Product Backend] Delegating payload and error to Aegis Remediation Agent...")
            try:
                healed_response = aegis_agent.heal_and_retry(old_cart_payload, error_details, target_url)
                print(f"[Product Backend] Order placed successfully after self-healing: {healed_response}")
                return healed_response
            except Exception as healing_err:
                print(f"[Product Backend] Aegis Remediation failed: {healing_err}")
                return {"status": "failed", "reason": str(healing_err)}
        else:
            # re-raise unhandled server errors
            print(f"[Product Backend] Fatal error {e.response.status_code}")
            raise

if __name__ == "__main__":

    checkout()