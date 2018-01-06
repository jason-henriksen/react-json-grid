'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import HelloWorld from '../src/index';

describe('HelloWorld Component', () => {
  it('should render correctly', () => {
    // Render the HelloWorld component
    const component = TestUtils.renderIntoDocument(
      <HelloWorld title="Hello World"/>
    );

    const titleNode = ReactDOM.findDOMNode(component);
    expect(titleNode.textContent).toEqual('Hello World');
  });
});
