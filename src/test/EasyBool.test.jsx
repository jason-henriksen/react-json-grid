import React from 'react';
import ReactDOM from 'react-dom';
// include the thing to test
import Toggle from '../docTool/Toggle';
// include the children to be looking for
import CheckboxBlankOutlineIcon from 'mdi-react/CheckboxBlankOutlineIcon';
import CheckboxMarkedOutlineIcon from 'mdi-react/CheckboxMarkedOutlineIcon';


import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('shows the correct icon when true', () => {
  const wrapper = shallow(<Toggle toggleValue={true}/>);
  console.log(wrapper.debug());  // debug the html to figure out what you're looking at
  expect(wrapper.find(CheckboxMarkedOutlineIcon)).toHaveLength(1);
  expect(wrapper.find(CheckboxBlankOutlineIcon)).toHaveLength(0);
});

it('shows the correct icon when false', () => {
  const wrapper = shallow(<Toggle toggleValue={false}/>);
  console.log(wrapper.debug());
  expect(wrapper.find(CheckboxMarkedOutlineIcon)).toHaveLength(0);
  expect(wrapper.find(CheckboxBlankOutlineIcon)).toHaveLength(1);
});
