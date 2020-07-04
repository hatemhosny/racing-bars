import React from 'react';
import Tabs from '@theme/Tabs';

export default function CodeTabs(props) {
  const AllTabs = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Angular', value: 'ng' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Python', value: 'py' },
    { label: 'R', value: 'r' },
    { label: 'Julia', value: 'julia' },
  ];

  const tabs =
    props.children
      ?.map((child) => child.props)
      .map((prop) => prop.value)
      .map((tabValue) => AllTabs.filter((AllTab) => tabValue === AllTab.value))
      .flat() || [];

  const defaultTab = tabs.length > 0 ? tabs[0].value : 'js';

  return (
    <Tabs defaultValue={defaultTab} values={tabs}>
      {props.children}
    </Tabs>
  );
}
