"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { updateHighestBid } from "@/lib/actions";

export default function BidForLotButton({
  bidEndTime,
  id,
  highestBid,
}: {
  bidEndTime: string;
  id: string;
  highestBid: number;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleBid = async (formData: FormData) => {
    const response = await updateHighestBid(id, highestBid, formData);
    toast(response);
    setModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Bid for lot</Button>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
            <h2 className="text-xl font-semibold mb-4">Place Your Bid</h2>
            <form action={handleBid}>
              <label className="block mb-2">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter your email"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">Bid Amount</span>
                <input
                  type="string"
                  className="w-full p-2 border rounded mt-1"
                  name="bidAmount"
                  placeholder="Enter bid amount"
                />
              </label>
              <div className="flex justify-end gap-2">
                <Button
                  variant="destructive"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="outline" type="submit">
                  Place Bid
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
