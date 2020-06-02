import pandas as pd
import racingbars as bars

# ['covid-19', 'gdp', 'population']
# data = bars.load_dataset("covid-19")
# data = bars.load_dataset("covid-19")
data = "http://127.0.0.1:8080/brand_values.csv"

# bars.config()
bars.race(
    data,
    # height="window*0.85",
    # html_file="chart.html",
    # show_overlays="none",
    # disable_group_colors=True,
    # labels_on_bars=False,
    # date_counter_format="MM/YYYY",
    # top_n=15,
    # loop=False,
    # tick_duration=100,
    # title="Covid-19: World-Wide",
    # sub_title="Number of Confirmed Cases/Country",
    # caption=" ",
    # color_seed="hatem",
)
bars.config(inline=True)
bars.race(data)
