/* eslint-disable import/no-unresolved */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const getBaseUrl = () =>
  ExecutionEnvironment.canUseDOM ? location.origin : useDocusaurusContext().siteConfig.url;
