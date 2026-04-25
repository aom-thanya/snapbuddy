# SnapBuddy Streamlit Project

## Project Structure
```bash
snapbuddy/
├─ app.py
├─ gemini_service.py
├─ requirements.txt
├─ README.md
├─ .gitignore
├─ .streamlit/
│  └─ secrets.toml
└─ snapbuddy_component/
   ├─ __init__.py
   └─ frontend/
      ├─ package.json
      ├─ package-lock.json
      ├─ vite.config.js
      ├─ index.html
      ├─ public/
      ├─ dist/
      └─ src/
         ├─ main.jsx
         ├─ App.jsx
         ├─ index.css
         ├─ data/
         │  └─ mockData.js
         ├─ utils/
         │  └─ vibeTags.js
         ├─ components/
         │  ├─ Header.jsx
         │  ├─ TopDestinations.jsx
         │  ├─ TrendingCard.jsx
         │  ├─ StatusBadge.jsx
         │  ├─ StarRow.jsx
         │  ├─ ReviewModal.jsx
         │  ├─ MyReviewModal.jsx
         │  └─ BookingDetailsFooter.jsx
         └─ screens/
            ├─ HomeScreen.jsx
            ├─ IntentScreen.jsx
            ├─ RefineScreen.jsx
            ├─ GeneratingScreen.jsx
            ├─ PlanScreen.jsx
            ├─ MatchingScreen.jsx
            ├─ BookingScreen.jsx
            ├─ BookingsScreen.jsx
            └─ BookingDetailsScreen.jsx
```

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
