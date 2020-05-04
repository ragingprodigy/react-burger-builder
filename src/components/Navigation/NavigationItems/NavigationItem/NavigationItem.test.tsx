import React from "react";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItem, { INavigationItemProps } from "./NavigationItem";
import { NavLink } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe("<NavigationItem />", () => {
  let wrapper: ShallowWrapper<INavigationItemProps>;

  beforeEach(() => {
    wrapper = shallow(<NavigationItem link='test'>TEST LINK</NavigationItem>);
  });

  it("should render 1 <NavLink /> element", () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });

  xit('should pass props correctly to <NavLink /> element', () => {
    wrapper.setProps({ exact: true });
    expect(wrapper.contains(<NavLink exact={true} to='test'>TEST LINK</NavLink>)).toBe(true);
  });
});
