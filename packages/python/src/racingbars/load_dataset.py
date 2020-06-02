import pandas as pd
from .configurations import DATA_DIR


def load_dataset(name):

    datasets = {
        "covid-19": "covid-19.csv",
        "gdp": "gdp.csv",
        "population": "population.csv",
    }

    available_datasets_msg = "These are the available datasets: " + str(
        list(datasets.keys())
    )

    if not name in datasets.keys():
        raise ValueError(f"Invalid dataset name: '{name}'\n" + available_datasets_msg)

    return pd.read_csv(DATA_DIR + datasets[name])
