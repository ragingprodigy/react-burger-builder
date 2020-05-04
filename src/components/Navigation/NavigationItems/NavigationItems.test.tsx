import { INavItemsProps } from '../../../interfaces/navigationItems/navigationsItemsProps';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper: ShallowWrapper<INavItemsProps>;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems isAuthenticated={false} />);
  });

  it('should render 2 <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if  authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('hides Orders and Logout <NavigationItem /> elements when not authenticated', () => {
    expect(
      wrapper.contains(<NavigationItem link="logout">Logout</NavigationItem>)
    ).toEqual(false);
    expect(
      wrapper.contains(<NavigationItem link="orders">Orders</NavigationItem>)
    ).toEqual(false);
  });

  it('should contain logout link when authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
