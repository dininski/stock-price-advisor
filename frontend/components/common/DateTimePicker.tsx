import DatePicker from "react-datepicker";
import { Control, Controller } from "react-hook-form";

export function DateTimePicker(props: {
  name: string;
  control: Control<Record<string, string>, string, Record<string, string>>;
  placeholderText: string;
}) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <DatePicker
          selected={value ? new Date(value) : null}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholderText={props.placeholderText}
          onBlur={onBlur}
          dateFormat="dd/MM/yyyy"
          onChange={onChange}
          value={value}
        />
      )}
    />
  );
}
