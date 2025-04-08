// components/DayPickerInput.tsx
import { format, addDays } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CalendarIcon } from "lucide-react";

export function DatePicker({
  value,
  onChange,
  label,
}: {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const minDate = addDays(new Date(), 2); // 🔒 Only allow dates starting 2 days from now

  return (
    <div className="relative w-full">
      {label && (
        <label className="text-sm font-medium mb-1 block">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border rounded-xl px-4 py-2 text-left flex items-center justify-between shadow-sm hover:shadow transition"
      >
        <span>{value ? format(value, "PPP") : "Select date"}</span>
        <CalendarIcon className="h-4 w-4 ml-2 text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-50 bg-white shadow-lg rounded-xl mt-2 p-4">
          <DayPicker
            mode="single"
            className="text-gray-900"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            disabled={{ before: minDate }} // ✅ Block earlier dates
            initialFocus
          />
        </div>
      )}
    </div>
  );
}
