import NotFoundPage from "./../../components/NotFoundPage";
import { shallow } from "enzyme";
import React from "react";

describe("should render NotFoundPage Component", () => {
  it("renders component", () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
