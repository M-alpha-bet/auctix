"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { DatePicker } from "./ui/datepicker";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createLot } from "@/lib/actions";
import { format } from "date-fns";

export default function LotForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bidEndTime, setBidEndTime] = useState<Date | undefined>(undefined);

  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formattedDate = bidEndTime
        ? format(bidEndTime, "yyyy-MM-dd")
        : null;

      const formValues = {
        lotName: formData.get("lotName") as string,
        description: formData.get("description") as string,
        bidEndTime: formattedDate,
        considerations: formData.get("considerations") as string,
        category: formData.get("category") as string,
        origin: formData.get("origin") as string,
        material: formData.get("material") as string,
        dimension: formData.get("dimension") as string,
        finish: formData.get("finish") as string,
        highestBid: 0,
        includes: formData.get("includes") as string,
        lotImage1: formData.get("lotImage1") as File,
        lotImage2: formData.get("lotImage2") as File,
        lotImage3: formData.get("lotImage3") as File,
        lotImage4: formData.get("lotImage4") as File,
      };

      await formSchema.parseAsync(formValues);

      const result = await createLot(prevState, formData, bidEndTime as Date);

      if (result.status === "SUCCESS") {
        toast("Lot created successfully");
        router.push(`/lots/details/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast("Please check your inputs and try again");
        return { ...prevState, error: "Validation failed!", status: "ERROR" };
      }

      toast("An unexpected error occurred!");
      return {
        ...prevState,
        error: "An unexpected error occurred!",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  //TODO: Add proper validation to images and dates
  return (
    <form action={formAction} className="lot-form">
      <div>
        <label htmlFor="lotName" className="lot-form_label">
          Lot Name
        </label>
        <Input
          id="lotName"
          name="lotName"
          className="lot-form_input"
          required
          placeholder="Enter lot name"
        />
        {errors.lotName && <p className="lot-form_error">{errors.lotName}</p>}
      </div>

      <div>
        <label htmlFor="description" className="lot-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="lot-form_textarea"
          required
          placeholder="Enter lot description"
        />
        {errors.description && (
          <p className="lot-form_error">{errors.description}</p>
        )}
      </div>

      <DatePicker
        value={bidEndTime}
        onChange={setBidEndTime}
        label="Bid End Time"
      />

      <div>
        <label htmlFor="considerations" className="lot-form_label">
          Considerations
        </label>
        <Input
          id="considerations"
          name="considerations"
          className="lot-form_input"
          placeholder="Considerations"
        />
        {errors.considerations && (
          <p className="lot-form_error">{errors.considerations}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="lot-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="lot-form_input"
          required
          placeholder="Category of lot"
        />
        {errors.category && <p className="lot-form_error">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="origin" className="lot-form_label">
          Origin of Lot
        </label>
        <Input
          id="origin"
          name="origin"
          className="lot-form_input"
          required
          placeholder="Origin of lot"
        />
        {errors.origin && <p className="lot-form_error">{errors.origin}</p>}
      </div>

      <div>
        <label htmlFor="material" className="lot-form_label">
          Material
        </label>
        <Input
          id="material"
          name="material"
          className="lot-form_input"
          placeholder="Material of lot"
        />
        {errors.material && <p className="lot-form_error">{errors.material}</p>}
      </div>

      <div>
        <label htmlFor="dimension" className="lot-form_label">
          Dimension
        </label>
        <Input
          id="dimension"
          name="dimension"
          className="lot-form_input"
          placeholder="Dimension"
        />
        {errors.dimension && (
          <p className="lot-form_error">{errors.dimension}</p>
        )}
      </div>

      <div>
        <label htmlFor="finish" className="lot-form_label">
          Finish
        </label>
        <Input
          id="finish"
          name="finish"
          className="lot-form_input"
          placeholder="Finishing"
        />
        {errors.finish && <p className="lot-form_error">{errors.finish}</p>}
      </div>

      <div>
        <label htmlFor="includes" className="lot-form_label">
          Includes
        </label>
        <Input
          id="includes"
          name="includes"
          className="lot-form_input"
          placeholder="Includes"
        />
        {errors.includes && <p className="lot-form_error">{errors.includes}</p>}
      </div>

      <div>
        <label htmlFor="lotImage1" className="lot-form_label">
          Lot Image 1
        </label>
        <Input id="lotImage1" name="lotImage1" type="file" />
        {errors.lotImage1 && (
          <p className="lot-form_error">{errors.lotImage1}</p>
        )}
      </div>

      <div>
        <label htmlFor="lotImage2" className="lot-form_label">
          Lot Image 2
        </label>
        <Input id="lotImage2" name="lotImage2" type="file" />
        {errors.lotImage2 && (
          <p className="lot-form_error">{errors.lotImage2}</p>
        )}
      </div>

      <div>
        <label htmlFor="lotImage3" className="lot-form_label">
          Lot Image 3
        </label>
        <Input id="lotImage3" name="lotImage3" type="file" />
        {errors.lotImage3 && (
          <p className="lot-form_error">{errors.lotImage3}</p>
        )}
      </div>

      <div>
        <label htmlFor="lotImage4" className="lot-form_label">
          Lot Image 4
        </label>
        <Input id="lotImage4" name="lotImage4" type="file" />
        {errors.lotImage4 && (
          <p className="lot-form_error">{errors.lotImage4}</p>
        )}
      </div>

      <Button type="submit" className="lot-form_btn" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit your lot"}
        <Send className="ml-1 size-6" />
      </Button>
    </form>
  );
}
