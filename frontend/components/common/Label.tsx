export function Label(props: { htmlFor: string; text: string }) {
  return (
    <label
      className="block text-sm font-bold mb-2"
      htmlFor={props.htmlFor}
    >
      {props.text}
    </label>
  );
}
