# SnapBuddy Streamlit Project

## Run locally

```bash
python3 -m venv venv
source venv/bin/activate
python3 -m pip install -r requirements.txt
cd snapbuddy_component/frontend
npm install
npm run build
cd ../..
python3 -m streamlit run app.py
```

## Deploy on Streamlit

Push the whole project to GitHub, including `snapbuddy_component/frontend/dist`, then deploy `app.py` on Streamlit Community Cloud.
