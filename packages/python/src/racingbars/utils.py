import pandas as pd

from random import randint
import os

from . import config


def write_html(
    data,
    options="{}",
    js_lib=True,
    file="",
    data_url="",
    data_url_type="json",
    element_id="",
    template="",
    template_contents={},
):

    if js_lib or file:
        lib_script = f"<script>{read_file(config.JS_LIB)}</script>\n"
    else:
        lib_script = ""

    element = f'<div id="{element_id}"></div>\n' if element_id else ""

    options_statement = f"var options = {options};"

    if data is not None:
        run_statement = f"""
      var data = {data.to_json(orient="records")};
      racingBars.race(data, options);
    """
    elif data_url:
        run_statement = f"""
      racingBars.loadData("{data_url}", "{data_url_type}").then((data) => {{
        racingBars.race(data, options);
      }});
    """
    else:
        raise TypeError("No data or data_url supplied")

    iife_script = f"""<script>
    (function() {{
      {options_statement}
      {run_statement}
    }})();
    </script>"""

    html = lib_script + element + iife_script

    if file:
        template_file = template or config.TEMPLATE
        html_page = use_template(read_file(template_file), html, template_contents)

        with open(file, "w") as html_file:
            html_file.write(html_page)

    return html


def read_file(path):
    with open(path, "r") as file:
        content = file.read()

    return content


def use_template(template, content, options, placeholder=config.TEMPLATE_PLACEHOLDER):
    for key in options:
        template = template.replace(f"{{{{{key}}}}}", options[key])

    template = template.replace(f"{{{{{placeholder}}}}}", content)

    return template
