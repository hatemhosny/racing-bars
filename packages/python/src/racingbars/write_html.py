import pandas as pd
from IPython.core.display import display, HTML
from .configurations import JS_LIB, TEMPLATE
from .utils import get_extension, read_file, use_template


def write_html(
    data,
    options="{}",
    insert_js_lib=None,
    file="",
    data_url_type="",
    element_id="",
    template="",
    template_expressions={},
    inline=False,
    use_cdn=False,
):

    if insert_js_lib is None and file == "":
        insert_js_lib = is_first_call()

    if insert_js_lib or file or inline:
        lib_script = f"<script>{read_file(JS_LIB)}</script>\n"
    else:
        lib_script = ""

    if element_id:
        element = f'<div id="{element_id}"></div>\n'
    else:
        element = ""

    options_statement = f"var options = {options};"

    if isinstance(data, pd.DataFrame):
        run_statement = f"""
          var data = {data.to_json(orient="records")};
          racingBars.race(data, options);
        """
    else:
        if data_url_type == "":
            data_url_type = get_extension(data)
        run_statement = f"""
          racingBars.loadData("{data}", "{data_url_type}").then((data) => {{
            racingBars.race(data, options);
          }});
        """

    iife_script = f"""<script>
      (function() {{
        {options_statement}
        {run_statement}
      }})();
      </script>
    """

    html = lib_script + element + iife_script

    if file:
        template_file = template or TEMPLATE
        html_page = use_template(read_file(template_file), html, template_expressions)
        with open(file, "w") as html_file:
            html_file.write(html_page)
    elif inline:
        display(HTML(html))
    else:
        return html


def is_first_call():
    if not hasattr(write_html, "counter"):
        write_html.counter = 0
    write_html.counter += 1
    return write_html.counter == 1
