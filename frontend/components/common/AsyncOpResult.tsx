import { Error } from "frontend/components/common/Error";
import { ReactElement } from "react";

export const AsyncOpWrapper = (props: {
  loading: boolean;
  errorText?: string;
  children?: ReactElement;
}) => {
  const { loading, errorText, children } = props;
  if (loading) {
    return <div>Loading...</div>;
  } else if (errorText) {
    return <Error show={true} message={errorText} />;
  } else {
    return <>{children}</>;
  }
};
