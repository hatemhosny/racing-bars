from . import race


def config(inline=False, use_cdn=False):

    if not hasattr(race, "configs"):
        race.configs = {}

    race.configs["inline"] = inline
    race.configs["use_cdn"] = use_cdn


def get_config():
    if not hasattr(race, "configs"):
        return dict()
    else:
        return race.configs
