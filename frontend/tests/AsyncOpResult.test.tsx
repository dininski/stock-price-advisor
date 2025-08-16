import { AsyncOpWrapper } from "frontend/components/common/AsyncOpResult";

describe("AsyncOpResult", () => {
  it("Displays loading when loading", () => {
    expect(
      <AsyncOpWrapper loading={true}>
        <div>On success</div>
      </AsyncOpWrapper>,
    ).toMatchSnapshot();
  });

  it("Displays error when loaded and has error", () => {
    expect(
      <AsyncOpWrapper loading={false} errorText={"error text"}>
        <div>On success</div>
      </AsyncOpWrapper>,
    ).toMatchSnapshot();
  });

  it("Display children when loaded and no error", () => {
    expect(
      <AsyncOpWrapper loading={false}>
        <div>On success</div>
      </AsyncOpWrapper>,
    ).toMatchSnapshot();
  });
});
