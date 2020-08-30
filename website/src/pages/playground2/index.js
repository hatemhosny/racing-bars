import React from 'react';
import Layout from '@theme/Layout';

function Playground() {
  return (
    <Layout title="Playground">
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
          src="https://repl.it/@hatemhosny/racing-bars?lite=true#index.js"
          style={{
            width: '95vw',
            height: '450px',
            border: '0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          scrolling="no"
          frameborder="no"
          allowtransparency="true"
          allowfullscreen="true"
          sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"
        ></iframe>
      </div>
    </Layout>
  );
}

export default Playground;
