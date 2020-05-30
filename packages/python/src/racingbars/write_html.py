from random import randint
import os

def write_html(data_file, output_file):

  print('hi')

  dirname = os.path.dirname(__file__)

  with open(dirname + '/js/racing-bars.umd.js', 'r') as js_file:
    js = js_file.read()

  with open(dirname + '/' + data_file, 'r') as data_file:
    data = data_file.read()

  element_id = 'racingbars' + str(randint(100000, 999999))

  script = f'''
    <script>
      {js}
    </script>
    <script>
      const data = {data};
      const options = {{
        selector: '#{element_id}',
        title: 'A Tale of 11 Years',
        subTitle: 'Top 10 Surgical Procedures',
        dateCounterFormat: 'MM/YYYY',
        caption: 'Aswan Heart Centre',
        loop: false,
        tickDuration: 500,
        autorun: false,
        height: 'window*0.9',
        width: 'window*0.9',
        showOverlays: 'none',
      }};
      // racingBars.loadData('data/procedures.json').then((data) => {{
        racingBars.race(data, options);
      // }});
    </script>'''


  html = f'<div id="{element_id}"></div>{script}'

  with open(output_file, "w") as html_file:
    html_file.write(html)
