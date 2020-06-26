import React from 'react';
import Layout from '@theme/Layout';

function Hello() {
  return (
    <Layout title="Hello">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '20px',
        }}
      >
        <iframe
          src="https://jsbin.com/kesapad/edit?html,output"
          style={{
            width: '95vw',
            height: '450px',
            border: '0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          title="hatemhosny/codesandbox-demo"
        ></iframe>
      </div>
    </Layout>
  );
}

export default Hello;
