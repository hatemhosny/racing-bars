import pandas as pd
import json
from random import randint

from .configurations import ID_PREFIX, TEMPLATE_PLACEHOLDER


def read_file(path):
    with open(path, "r") as file:
        content = file.read()
    return content


def use_template(template, content, options, placeholder=TEMPLATE_PLACEHOLDER):
    for key in options:
        template = template.replace(f"{{{{{key}}}}}", options[key])

    template = template.replace(f"{{{{{placeholder}}}}}", content)

    return template


def wide_to_long(df, date_col="date"):
    return pd.melt(df, id_vars=date_col, var_name="name")


def prepare_options(options):
    python_only_options = ["data", "html_file", "template", "data_url_type"]
    for key in python_only_options:
        options.pop(key, None)

    options = to_camel_case(options)

    if options["selector"] == "":
        element_id = ID_PREFIX + str(randint(100000, 999999))
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


def get_extension(url):
    last_chars = url[-4:]
    if last_chars in [".csv", ".tsv", ".xml"]:
        return url[-3:]
    else:
        return "json"
