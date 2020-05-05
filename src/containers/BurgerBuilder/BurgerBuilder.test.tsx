import { IBurgerBuilderProps } from '../../interfaces/burderBuilder/burgerBuilderProps';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { BurgerBuilder } from './BurgerBuilder';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper: ShallowWrapper<IBurgerBuilderProps>;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder />);
  });

  it('should render <Burger /> when ingredients are received', () => {
    wrapper.setProps({
      ingredients: [{ label: 'salad', units: 0, price: 0.45 }],
    });
    expect(wrapper.find(Spinner)).toHaveLength(0);
    expect(wrapper.find(Burger)).toHaveLength(1);
  });

  it('should render <Spinner /> when there are no ingredients', () => {
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it('should show error message when ingredients cannot be loaded', () => {
    wrapper.setProps({ error: true });
    expect(wrapper.contains(<p>Ingredients can't be loaded</p>)).toBe(true);
  });
});
