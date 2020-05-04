import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from "./NavigationItem/NavigationItem";
import { INavItemsProps } from '@burger/interfaces/navigationItems/navigationsItemsProps';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper: ShallowWrapper<INavItemsProps>;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems isAuthenticated={false} />);
  });

  it('should render 2 <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> elements if  authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
