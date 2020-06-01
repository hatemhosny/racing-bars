import racingbars as bars
import pandas as pd

import os

dirname = os.path.dirname(__file__)

# data = bars.read_file(dirname + "/racingbars/data/procedures.json")
data_df = pd.read_csv(dirname + "/racingbars/data/population.csv")

bars.race(
    data_df,
    height="window*0.85",
    html_file="chart.html",
    show_overlays="none",
    disable_group_colors=True,
    date_counter_format="YYYY",
)
