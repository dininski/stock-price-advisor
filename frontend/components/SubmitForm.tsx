import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type Inputs = {
  startDate: string;
  endDate: string;
};

export default function DateRangeForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => console.log(data);

  // TODO: remove eslint override
  return (
    <div className="w-full max-w-xs">
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Start date
          </label>
          <Controller
            name="startDate"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholderText="Start date"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors.startDate && (
            <p className="text-red-500 text-xs italic">
              Please select time to buy.
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            End date
          </label>
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                placeholderText="End date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs italic">
              Please select time to sell.
            </p>
          )}
        </div>
        <input
          title="Submit"
          type="submit"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        />
      </form>
    </div>
  );
}
