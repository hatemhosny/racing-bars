import json
from .utils import prepare_options, write_html


def race(
    data,
    selector="",
    data_shape="long",
    fill_date_gaps=False,
    fill_date_gaps_value="Last",
    title="",
    sub_title="",
    date_counter_format="MM YYYY",
    caption="",
    start_date="",
    end_date="",
    loop=True,
    labels_on_bars=True,
    labels_width=150,
    color_seed="",
    disable_group_colors=False,
    tick_duration=500,
    top_n=10,
    height="",
    width="",
    disable_click_events=True,
    disable_keyboard_events=False,
    show_controls="all",
    show_overlays="all",
    autorun=False,
    inject_styles=True,
    html_file="",
    template="",
    data_url="",
    data_url_type="json",
):

    options, element_id, template_expressions = prepare_options(locals())

    html = write_html(
        data,
        options=options,
        file=html_file,
        data_url=data_url,
        data_url_type=data_url_type,
        element_id=element_id,
        template=template,
        template_expressions=template_expressions,
    )

    return html
