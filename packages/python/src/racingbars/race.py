import json
from random import randint

def race(
  data,
  selector="",
  dataShape="long",
  fillDateGaps=False,
  fillDateGapsValue="Last",
  title="",
  subTitle="",
  dateCounterFormat="MM YYYY",
  caption="",
  startDate="",
  endDate="",
  loop=True,
  labelsOnBars=True,
  labelsWidth=150,
  colorSeed="",
  disableGroupColors=False,
  tickDuration=500,
  topN=10,
  height="",
  width="",
  disableClickEvents=True,
  disableKeyboardEvents=False,
  showControls="all",
  showOverlays="all",
  autorun=False,
  injectStyles=True):

  options = locals()
  options.pop('data', None)

  if options["selector"] == "":
    element_id = 'racingbars' + str(randint(100000, 999999))
    options["selector"] = "#" + element_id

  return json.dumps(options)


print(race('data'))

