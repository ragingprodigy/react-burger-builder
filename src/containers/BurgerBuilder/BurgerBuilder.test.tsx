import { IBurgerBuilderProps } from '../../interfaces/burderBuilder/burgerBuilderProps';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { BurgerBuilder } from './BurgerBuilder';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper: ShallowWrapper<IBurgerBuilderProps>;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder />);
  });

  xit('should render <BuildControls /> when ingredients are received', () => {
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
