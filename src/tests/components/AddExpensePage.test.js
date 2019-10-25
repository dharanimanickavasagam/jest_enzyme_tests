import { AddExpensePage } from "./../../components/AddExpensePage";
import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";

let onSubmitSpy, historySpy, wrapper;
beforeEach(() => {
  onSubmitSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage onSubmit={onSubmitSpy} history={historySpy} />
  );
});

describe("Should render the component", () => {
  test("add an expense", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("add an expense", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    expect(historySpy.push).toHaveBeenLastCalledWith("/");
    expect(onSubmitSpy).toHaveBeenLastCalledWith(expenses[1]);
  });
});
