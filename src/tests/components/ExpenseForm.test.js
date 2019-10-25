import ExpenseForm from "./../../components/ExpenseForm";
import { shallow } from "enzyme";
import React from "react";
import expenses from "../fixtures/expenses";
import moment from "moment";

describe("should render ExpenseForm", () => {
  it("should render the component when there is no expense passed", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the component with some expense", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render error for invalid submission", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("form").simulate("submit", {
      preventDefault: () => {}
    });

    expect(wrapper.state().error).toEqual(
      "Please provide description and amount."
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should set description on input change", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", {
        target: {
          value: "Changed description"
        }
      });

    expect(wrapper.state().description).toBe("Changed description");
    expect(wrapper).toMatchSnapshot();
  });

  it("should set note on input change", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("textarea").simulate("change", {
      target: {
        value: "Changed note"
      }
    });

    expect(wrapper.state().note).toBe("Changed note");
    expect(wrapper).toMatchSnapshot();
  });

  it("should set amount", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper
      .find("input")
      .at(1)
      .simulate("change", {
        target: {
          value: "12"
        }
      });

    expect(wrapper.state().amount).toBe("12");
    //expect(wrapper).toMatchSnapshot();
  });

  it("should not set amount if it contains some letters", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper
      .find("input")
      .at(1)
      .simulate("change", {
        target: {
          value: "123d4"
        }
      });

    expect(wrapper.state().amount).toBe("");
    expect(wrapper).toMatchSnapshot();
  });

  it("should not set amount in decimals", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper
      .find("input")
      .at(1)
      .simulate("change", {
        target: {
          value: "12.23"
        }
      });

    expect(wrapper.state().amount).toBe("12.23");
    expect(wrapper).toMatchSnapshot();
  });

  it("should not set amount if it contains some letters", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper
      .find("input")
      .at(1)
      .simulate("change", {
        target: {
          value: "12.12345"
        }
      });

    expect(wrapper.state().amount).toBe("");
    expect(wrapper).toMatchSnapshot();
  });

  test("should call onSubmit props for valid form submission", () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(
      <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
    );

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {}
    });

    expect(wrapper.state().error).toBe("");
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
      description: expenses[0].description,
      amount: expenses[0].amount,
      note: expenses[0].note,
      createdAt: expenses[0].createdAt
    });
  });

  describe("should set new date on dateChange", () => {
    test("set date onchange", () => {
      const now = moment();
      const wrapper = shallow(<ExpenseForm />);
      wrapper.find("SingleDatePicker").prop("onDateChange")(now);
      expect(wrapper.state("createdAt")).toEqual(now);
    });
  });

  describe("should set calendar focus onChange", () => {
    test("set calendar focus onchange", () => {
      const wrapper = shallow(<ExpenseForm />);
      wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused: true });
      expect(wrapper.state("calendarFocused")).toEqual(true);
    });
  });
});
