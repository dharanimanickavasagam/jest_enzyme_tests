import React from "react";
import { shallow } from "enzyme";
import ExpenseListItem from "./../../components/ExpenseListItem";
import expenses from "../fixtures/expenses";

describe("should render ExpenseListItem Component", () => {
  it("should render ", () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
