import React from 'react';
import Layout from '../playground2/node_modules/@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeTabs from '../../Components/code-tabs/code-tabs';

import RacingBars from '../../../racing-bars.js';
import CodeBlock from './code-block.js';

export default function () {
  const defaultState = {
    fillDateGapsInterval: null,
    fillDateGapsValue: 'interpolate',
    startDate: '',
    endDate: '',
    colorSeed: '',
    showGroups: false,
    tickDuration: 500,
    topN: 10,
    mouseControls: false,
    keyboardControls: false,
    autorun: true,
    loop: false,
    injectStyles: true,
    title: 'World Population',
    subTitle: 'in millions',
    caption: '',
    dateCounter: 'MM/YYYY',
    labelsPosition: 'inside',
    labelsWidth: 150,
    showIcons: false,
    controlButtons: 'all',
    overlays: 'none',
    height: '',
    width: '',
    marginTop: 0,
    marginRight: 20,
    marginBottom: 5,
    marginLeft: 0,
    theme: 'light',
    colorMap: {},
    fixedScale: false,
    fixedOrder: [],
    highlightBars: false,
    selectBars: false,
  };

  const [state, setState] = React.useState(defaultState);

  function changeState(prop) {
    return function (event) {
      const value =
        event.target.value === 'false'
          ? false
          : event.target.value === 'true'
          ? true
          : event.target.value === 'null'
          ? null
          : event.target.value;
      setState({ ...state, [prop]: value });
    };
  }

  function reset() {
    setState(defaultState);
  }

  const transformFn = (data) =>
    data.map((d) => ({
      ...d,
      icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
    }));

  return (
    <Layout title="Playground">
      <div className="editor container">
        <div className="row">
          <div className="col" style={{ position: 'relative' }}>
            <div className="sticky">
              <CodeTabs>
                <TabItem value="chart">
                  <div className="gallery" style={{ height: '70vh' }}>
                    <RacingBars
                      dataUrl="/data/population.csv"
                      dataType="csv"
                      dataTransform={transformFn}
                      fillDateGapsInterval={state.fillDateGapsInterval}
                      fillDateGapsValue={state.fillDateGapsValue}
                      startDate={state.startDate}
                      endDate={state.endDate}
                      colorSeed={state.colorSeed}
                      showGroups={state.showGroups}
                      tickDuration={state.tickDuration}
                      topN={state.topN}
                      mouseControls={state.mouseControls}
                      keyboardControls={state.keyboardControls}
                      autorun={state.autorun}
                      loop={state.loop}
                      injectStyles={state.injectStyles}
                      title={state.title}
                      subTitle={state.subTitle}
                      caption={state.caption}
                      dateCounter={state.dateCounter}
                      labelsPosition={state.labelsPosition}
                      labelsWidth={state.labelsWidth}
                      showIcons={state.showIcons}
                      controlButtons={state.controlButtons}
                      overlays={state.overlays}
                      height={state.height}
                      width={state.width}
                      marginTop={state.marginTop}
                      marginRight={state.marginRight}
                      marginBottom={state.marginBottom}
                      marginLeft={state.marginLeft}
                      theme={state.theme}
                      colorMap={state.colorMap}
                      fixedScale={state.fixedScale}
                      fixedOrder={state.fixedOrder}
                      highlightBars={state.highlightBars}
                      selectBars={state.selectBars}
                    />
                  </div>
                </TabItem>
                <TabItem value="js">
                  <CodeBlock lang="js" options={state}></CodeBlock>
                </TabItem>
                <TabItem value="ts">
                  <CodeBlock lang="ts" options={state}></CodeBlock>
                </TabItem>
                <TabItem value="ng">
                  <CodeBlock lang="ng" options={state}></CodeBlock>
                </TabItem>
                <TabItem value="react">
                  <CodeBlock lang="react" options={state}></CodeBlock>
                </TabItem>
                <TabItem value="vue">
                  <CodeBlock lang="vue" options={state}></CodeBlock>
                </TabItem>
                <TabItem value="py">
                  <CodeBlock lang="py" options={state}></CodeBlock>
                </TabItem>
              </CodeTabs>
            </div>
          </div>
          <div className="col col--3">
            <form className="form" onReset={reset}>
              <fieldset>
                <div>
                  <label htmlFor="dataField">Data</label>
                  <select id="dataField">
                    <option value="Population">Population</option>
                    <option value="GDP">GDP</option>
                    <option value="Covid-19">Covid-19</option>
                    <option value="Brand Values">Brand Values</option>
                    <option value="Github Push Events">Github Push Events</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="titleField">title</label>
                  <input
                    type="text"
                    id="titleField"
                    defaultValue={state.title}
                    onChange={changeState('title')}
                  />
                </div>

                <div>
                  <label htmlFor="subTitleField">subTitle</label>
                  <input
                    type="text"
                    id="subTitleField"
                    defaultValue={state.subTitle}
                    onChange={changeState('subTitle')}
                  />
                </div>

                <div>
                  <label htmlFor="captionField">caption</label>
                  <input
                    type="text"
                    id="captionField"
                    defaultValue={state.caption}
                    onChange={changeState('caption')}
                  />
                </div>

                <div>
                  <label htmlFor="dateCounterField">dateCounter</label>
                  <input
                    type="text"
                    id="dateCounterField"
                    defaultValue={state.dateCounter}
                    onChange={changeState('dateCounter')}
                  />
                </div>

                <div>
                  <label htmlFor="widthField">width</label>
                  <input
                    type="number"
                    id="widthField"
                    defaultValue={state.width}
                    onChange={changeState('width')}
                  />
                </div>

                <div>
                  <label htmlFor="heightField">height</label>
                  <input
                    type="number"
                    id="heightField"
                    defaultValue={state.height}
                    onChange={changeState('height')}
                  />
                </div>

                <div>
                  <label htmlFor="marginTopField">marginTop</label>
                  <input
                    type="range"
                    id="marginTopField"
                    min="0"
                    max="50"
                    step="1"
                    defaultValue={state.marginTop}
                    onChange={changeState('marginTop')}
                  />
                  <span className="field-value">{state.marginTop}</span>
                </div>

                <div>
                  <label htmlFor="marginRightField">marginRight</label>
                  <input
                    id="marginRightField"
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    defaultValue={state.marginRight}
                    onChange={changeState('marginRight')}
                  />
                  <span className="field-value">{state.marginRight}</span>
                </div>

                <div>
                  <label htmlFor="marginBottomField">marginBottom</label>
                  <input
                    id="marginBottomField"
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    defaultValue={state.marginBottom}
                    onChange={changeState('marginBottom')}
                  />
                  <span className="field-value">{state.marginBottom}</span>
                </div>

                <div>
                  <label htmlFor="marginLeftField">marginLeft</label>
                  <input
                    id="marginLeftField"
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    defaultValue={state.marginLeft}
                    onChange={changeState('marginLeft')}
                  />
                  <span className="field-value">{state.marginLeft}</span>
                </div>

                <div>
                  <label htmlFor="startDateField">startDate</label>
                  <input
                    type="date"
                    id="startDateField"
                    defaultValue={state.startDate}
                    onChange={changeState('startDate')}
                  />
                </div>

                <div>
                  <label htmlFor="endDateField">endDate</label>
                  <input
                    type="date"
                    id="endDateField"
                    defaultValue={state.endDate}
                    onChange={changeState('endDate')}
                  />
                </div>

                <div>
                  <label htmlFor="fillDateGapsIntervalField">fillDateGapsInterval</label>
                  <select
                    id="fillDateGapsIntervalField"
                    defaultValue={state.fillDateGapsInterval}
                    onChange={changeState('fillDateGapsInterval')}
                  >
                    <option value=""></option>
                    <option value="year">year</option>
                    <option value="month">month</option>
                    <option value="day">day</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="fillDateGapsValueField">fillDateGapsValue</label>
                  <select
                    id="fillDateGapsValueField"
                    defaultValue={state.fillDateGapsValue}
                    onChange={changeState('fillDateGapsValue')}
                    disabled={state.fillDateGapsInterval ? '' : 'disabled'}
                  >
                    <option value="interpolate">interpolate</option>
                    <option value="last">last</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="colorSeedField">colorSeed</label>
                  <input
                    type="text"
                    id="colorSeedField"
                    defaultValue={state.colorSeed}
                    onChange={changeState('colorSeed')}
                  />
                </div>

                <div>
                  <label htmlFor="showGroupsField">showGroups</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="showGroupsField"
                      id="showGroupsFieldTrue"
                      value="true"
                      defaultChecked={state.showGroups ? 'checked' : ''}
                      onChange={changeState('showGroups')}
                    />
                    <label className="label-inline radio" htmlFor="showGroupsFieldTrue">
                      true
                    </label>
                    <input
                      type="radio"
                      name="showGroupsField"
                      id="showGroupsFieldFalse"
                      value="false"
                      defaultChecked={state.showGroups ? '' : 'checked'}
                      onChange={changeState('showGroups')}
                    />
                    <label className="label-inline radio" htmlFor="showGroupsFieldFalse">
                      false
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="tickDurationField">tickDuration</label>
                  <input
                    id="tickDurationField"
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    defaultValue={state.tickDuration}
                    onChange={changeState('tickDuration')}
                  />
                  <span className="field-value">{state.tickDuration}</span>
                </div>

                <div>
                  <label htmlFor="topNField">topN</label>
                  <input
                    id="topNField"
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    defaultValue={state.topN}
                    onChange={changeState('topN')}
                  />
                  <span className="field-value">{state.topN}</span>
                </div>

                <div>
                  <label htmlFor="mouseControlsField">mouseControls</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="mouseControlsField"
                      id="mouseControlsFieldTrue"
                      value="true"
                      defaultChecked={state.mouseControls ? 'checked' : ''}
                      onChange={changeState('mouseControls')}
                    />
                    <label className="label-inline radio" htmlFor="mouseControlsFieldTrue">
                      true
                    </label>
                    <input
                      type="radio"
                      name="mouseControlsField"
                      id="mouseControlsFieldFalse"
                      value="false"
                      defaultChecked={state.mouseControls ? '' : 'checked'}
                      onChange={changeState('mouseControls')}
                    />
                    <label className="label-inline radio" htmlFor="mouseControlsFieldFalse">
                      false
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="keyboardControlsField">keyboardControls</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="keyboardControlsField"
                      id="keyboardControlsFieldTrue"
                      value="true"
                      defaultChecked={state.keyboardControls ? 'checked' : ''}
                      onChange={changeState('keyboardControls')}
                    />
                    <label className="label-inline radio" htmlFor="keyboardControlsFieldTrue">
                      true
                    </label>
                    <input
                      type="radio"
                      name="keyboardControlsField"
                      id="keyboardControlsFieldFalse"
                      value="false"
                      defaultChecked={state.keyboardControls ? '' : 'checked'}
                      onChange={changeState('keyboardControls')}
                    />
                    <label className="label-inline radio" htmlFor="keyboardControlsFieldFalse">
                      false
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="autorunField">autorun</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="autorunField"
                      id="autorunFieldTrue"
                      value="true"
                      defaultChecked={state.autorun ? 'checked' : ''}
                      onChange={changeState('autorun')}
                    />
                    <label className="label-inline radio" htmlFor="autorunFieldTrue">
                      true
                    </label>
                    <input
                      type="radio"
                      name="autorunField"
                      value="false"
                      id="autorunFieldFalse"
                      defaultChecked={state.autorun ? '' : 'checked'}
                      onChange={changeState('autorun')}
                    />
                    <label className="label-inline radio" htmlFor="autorunFieldFalse">
                      false
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="loopField">loop</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="loopField"
                      id="loopFieldTrue"
                      value="true"
                      defaultChecked={state.loop ? 'checked' : ''}
                      onChange={changeState('loop')}
                    />
                    <label className="label-inline radio" htmlFor="loopFieldTrue">
                      true
                    </label>
                    <input
                      type="radio"
                      name="loopField"
                      id="loopFieldFalse"
                      value="false"
                      defaultChecked={state.loop ? '' : 'checked'}
                      onChange={changeState('loop')}
                    />
                    <label className="label-inline radio" htmlFor="loopFieldFalse">
                      false
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="labelsPositionField">labelsPosition</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="labelsPositionField"
                      id="labelsPositionFieldTrue"
                      value="inside"
                      defaultChecked={state.labelsPosition === 'inside' ? 'checked' : ''}
                      onChange={changeState('labelsPosition')}
                    />
                    <label className="label-inline radio" htmlFor="labelsPositionFieldTrue">
                      inside
                    </label>
                    <input
                      type="radio"
                      name="labelsPositionField"
                      id="labelsPositionFieldFalse"
                      value="outside"
                      defaultChecked={state.labelsPosition === 'outside' ? 'checked' : ''}
                      onChange={changeState('labelsPosition')}
                    />
                    <label className="label-inline radio" htmlFor="labelsPositionFieldFalse">
                      outside
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="labelsWidthField">labelsWidth</label>
                  <input
                    id="labelsWidthField"
                    type="range"
                    min="50"
                    max="300"
                    step="1"
                    defaultValue={state.labelsWidth}
                    onChange={changeState('labelsWidth')}
                    disabled={state.labelsPosition === 'inside' ? 'disabled' : ''}
                  />
                  <span className="field-value">
                    {state.labelsPosition === 'outside' ? state.labelsWidth : ''}
                  </span>
                </div>

                <div>
                  <label htmlFor="showIconsField">showIcons</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="showIconsField"
                      id="showIconsFieldTrue"
                      value="true"
                      defaultChecked={state.showIcons ? 'checked' : ''}
                      onChange={changeState('showIcons')}
                    />
                    <label className="label-inline radio" htmlFor="showIconsFieldTrue">
                      true
                    </label>
                    <input
                      type="radio"
                      name="showIconsField"
                      id="showIconsFieldFalse"
                      value="false"
                      defaultChecked={state.showIcons ? '' : 'checked'}
                      onChange={changeState('showIcons')}
                    />
                    <label className="label-inline radio" htmlFor="showIconsFieldFalse">
                      false
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="controlButtonsField">controlButtons</label>
                  <select
                    id="controlButtonsField"
                    defaultValue={state.controlButtons}
                    onChange={changeState('controlButtons')}
                  >
                    <option value="all">all</option>
                    <option value="play">play</option>
                    <option value="none">none</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="overlaysField">overlays</label>
                  <select
                    id="overlaysField"
                    defaultValue={state.overlays}
                    onChange={changeState('overlays')}
                  >
                    <option value="all">all</option>
                    <option value="play">play</option>
                    <option value="repeat">repeat</option>
                    <option value="none">none</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="themeField">theme</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="themeField"
                      id="themeFieldLight"
                      value="light"
                      defaultChecked={state.theme === 'light' ? 'checked' : ''}
                      onChange={changeState('theme')}
                    />
                    <label className="label-inline radio" htmlFor="themeFieldLight">
                      light
                    </label>
                    <input
                      type="radio"
                      name="themeField"
                      id="themeFieldDark"
                      value="dark"
                      defaultChecked={state.theme === 'dark' ? 'checked' : ''}
                      onChange={changeState('theme')}
                    />
                    <label className="label-inline radio" htmlFor="themeFieldDark">
                      dark
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="fixedScaleField">fixedScale</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="fixedScaleField"
                      id="fixedScaleFieldTrue"
                      value="true"
                      defaultChecked={state.fixedScale ? 'checked' : ''}
                      onChange={changeState('fixedScale')}
                    />
                    <label className="label-inline radio" htmlFor="fixedScaleFieldTrue">
                      true
                    </label>
                    <input
                      type="radio"
                      name="fixedScaleField"
                      id="fixedScaleFieldFalse"
                      value="false"
                      defaultChecked={state.fixedScale ? '' : 'checked'}
                      onChange={changeState('fixedScale')}
                    />
                    <label className="label-inline radio" htmlFor="fixedScaleFieldFalse">
                      false
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="highlightBarsField">highlightBars</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="highlightBarsField"
                      id="highlightBarsFieldTrue"
                      value="true"
                      defaultChecked={state.highlightBars ? 'checked' : ''}
                      onChange={changeState('highlightBars')}
                    />
                    <label className="label-inline radio" htmlFor="highlightBarsFieldTrue">
                      true
                    </label>
                    <input
                      type="radio"
                      name="highlightBarsField"
                      id="highlightBarsFieldFalse"
                      value="false"
                      defaultChecked={state.highlightBars ? '' : 'checked'}
                      onChange={changeState('highlightBars')}
                    />
                    <label className="label-inline radio" htmlFor="highlightBarsFieldFalse">
                      false
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="selectBarsField">selectBars</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="selectBarsField"
                      id="selectBarsFieldTrue"
                      value="true"
                      defaultChecked={state.selectBars ? 'checked' : ''}
                      onChange={changeState('selectBars')}
                    />
                    <label className="label-inline radio" htmlFor="selectBarsFieldTrue">
                      true
                    </label>
                    <input
                      type="radio"
                      name="selectBarsField"
                      id="selectBarsFieldFalse"
                      value="false"
                      defaultChecked={state.selectBars ? '' : 'checked'}
                      onChange={changeState('selectBars')}
                    />
                    <label className="label-inline radio" htmlFor="selectBarsFieldFalse">
                      false
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="colorMapField">colorMap</label>
                  <textarea placeholder="Hi CJ …" id="colorMapField"></textarea>
                </div>

                <div>
                  <label htmlFor="fixedOrderField">fixedOrder</label>
                  <textarea placeholder="Hi CJ …" id="fixedOrderField"></textarea>
                </div>

                <div className="float-right">
                  <input type="checkbox" id="confirmField" />
                  <label className="label-inline checkbox" htmlFor="confirmField">
                    Send a copy to yourself
                  </label>
                </div>

                <div>
                  <label htmlFor="injectStylesField">injectStyles</label>
                  <div className="float-right">
                    <input
                      type="radio"
                      name="injectStylesField"
                      id="injectStylesFieldTrue"
                      value="true"
                      defaultChecked={state.injectStyles ? 'checked' : ''}
                      onChange={changeState('injectStyles')}
                    />
                    <label className="label-inline radio" htmlFor="injectStylesFieldTrue">
                      true
                    </label>
                    <input
                      type="radio"
                      name="injectStylesField"
                      id="injectStylesFieldFalse"
                      value="false"
                      defaultChecked={state.injectStyles ? '' : 'checked'}
                      onChange={changeState('injectStyles')}
                    />
                    <label className="label-inline radio" htmlFor="injectStylesFieldFalse">
                      false
                    </label>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <button type="reset" className="button button--warning">
                    Reset
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
