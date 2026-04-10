import streamlit as st
from snapbuddy_component import snapbuddy_component

# ตั้งค่า layout เต็มจอ
st.set_page_config(layout="wide")

# ซ่อน UI ของ Streamlit ทั้งหมด
st.markdown("""
<style>
#MainMenu {visibility: hidden;}
header {visibility: hidden;}
footer {visibility: hidden;}

.block-container {
    padding: 0rem;
    margin: 0rem;
    max-width: 100%;
}

iframe {
    width: 100% !important;
    height: 100vh !important;
    border: none;
}
</style>
""", unsafe_allow_html=True)

# เรียก SnapBuddy component (ไม่มี title แล้ว)
snapbuddy_component()