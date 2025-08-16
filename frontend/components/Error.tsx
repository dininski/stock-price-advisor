export const Error = (props: { show: boolean; message: string }) => {
  return props.show ? (
    <p className="text-red-500 text-xs italic">{props.message}</p>
  ) : (
    <></>
  );
};
