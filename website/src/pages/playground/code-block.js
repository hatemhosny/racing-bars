import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Palenight from 'prism-react-renderer/themes/palenight';
import { getCodeTemplates, languages } from './code-templates';

export default function (props) {
  const codes = getCodeTemplates(props.options);

  return (
    <Highlight
      {...defaultProps}
      theme={Palenight}
      code={(codes[props.lang] || '').trim()}
      language={languages[props.lang] || 'js'}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
