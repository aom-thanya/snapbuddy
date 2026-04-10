import streamlit as st
from snapbuddy_component import snapbuddy_component

st.set_page_config(page_title="SnapBuddy", layout="wide")
st.title("📸 SnapBuddy")

snapbuddy_component(key="snapbuddy")
