import { shallow } from "enzyme";
import React from "react";
import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";

describe("should render ExpenseDashboardPage Component", () => {
  it("renders component", () => {
    const wrapper = shallow(<ExpenseDashboardPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
