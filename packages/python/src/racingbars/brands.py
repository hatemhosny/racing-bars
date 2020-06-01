import pandas as pd

url = "https://www.interbrand.com/best-brands/best-global-brands/previous-years/2015/"
df_list = pd.read_html(url)
print(df_list)
