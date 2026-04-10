import os
import streamlit.components.v1 as components

_parent_dir = os.path.dirname(os.path.abspath(__file__))
_build_dir = os.path.join(_parent_dir, "frontend", "dist")

_component_func = components.declare_component(
    "snapbuddy_component",
    path=_build_dir,
)


def snapbuddy_component(key=None, default=None):
    return _component_func(key=key, default=default)
