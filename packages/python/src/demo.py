import racingbars as bars
import pandas as pd

import os

dirname = os.path.dirname(__file__)

# data = bars.read_file(dirname + "/racingbars/data/procedures.json")
data_df = pd.read_json(dirname + "/racingbars/data/procedures.json")

html = bars.race(data_df, height="window*0.85",)
html += bars.race(data_df, height="window*0.85",)
html += bars.race(data_df, height="window*0.85",)
html += bars.race(data_df, height="window*0.85",)

f = open("myhtml.html", "a")
f.write(html)
f.close()
