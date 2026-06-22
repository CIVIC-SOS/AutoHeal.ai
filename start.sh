#!/bin/bash
# Move into the backend directory so that files (like dashboard.html and aegis_audit.db) are resolved correctly
cd backend

# Start the Mock Vendor API in the background. Override the PORT to 8000 to prevent conflict with the main server.
PORT=8000 python mock_vendor.py &

# Start the main AutoHeal.ai Dashboard server in the foreground, binding it to Render's assigned PORT
python server.py
