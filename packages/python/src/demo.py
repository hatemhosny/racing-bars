import racingbars as bars
import pandas as pd

import os

dirname = os.path.dirname(__file__)

data = bars.read_file(dirname + "/racingbars/data/procedures.json")
data_df = pd.read_json(dirname + "/racingbars/data/procedures.json")

template_contents = {
    "title": "My title",
    "subTitle": "My subtitle",
    "caption": "My caption",
}
content = bars.write_html(
    data_df,
    js_lib=False,
    file="chart.html",
    element_id="race",
    data_url="url",
    template_contents=template_contents,
)

# print(content)
