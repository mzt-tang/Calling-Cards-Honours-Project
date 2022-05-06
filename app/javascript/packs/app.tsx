// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import { createRoot } from 'react-dom/client';

import Draggable from 'react-draggable';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(<App tab='home' />);
})

function App({tab}) {
  return (
    <div className='app'>
      <Draggable>
        <div className="box">
            <div>Movable box!</div>
        </div>
      </Draggable>
    </div>
  );
};
