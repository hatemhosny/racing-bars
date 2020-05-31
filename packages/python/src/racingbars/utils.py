import pandas as pd
import json
from random import randint
import os

from . import config


def write_html(
    data,
    options="{}",
    insert_js_lib=None,
    file="",
    data_url="",
    data_url_type="json",
    element_id="",
    template="",
    template_expressions={},
):

    if insert_js_lib is None and file == "":
        insert_js_lib = is_first_call()

    if insert_js_lib or file:
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
        html_page = use_template(read_file(template_file), html, template_expressions)

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


def wide_to_long(df, date_col="date"):
    return pd.melt(df, id_vars=date_col, var_name="name")


def prepare_options(options):

    python_only_options = ["data", "html_file", "template", "data_url", "data_url_type"]
    for key in python_only_options:
        options.pop(key, None)

    options = to_camel_case(options)

    if options["selector"] == "":
        element_id = config.ID_PREFIX + str(randint(100000, 999999))
        options["selector"] = "#" + element_id
    else:
        element_id = ""

    template_expressions = {
        "title": options["title"],
        "subTitle": options["subTitle"],
        "caption": options["caption"],
    }

    return json.dumps(options), element_id, template_expressions


def to_camel_case(options):
    camel_options = {}
    for key in options.keys():
        components = key.split("_")
        camel_key = components[0] + "".join(x.title() for x in components[1:])
        camel_options[camel_key] = options[key]
    return camel_options


def is_first_call():
    if not hasattr(write_html, "counter"):
        write_html.counter = 0
    write_html.counter += 1
    return write_html.counter == 1
