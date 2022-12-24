import { useState } from "react";
import Box from "./Box";
import ButtonPrim from "./ButtonPrim";
import ButtonSec from "./ButtonSec";
import ButtonWarm from "./ButtonWarm";
import Modal from "./Modal";

export default function Verifier({ text, open, set, onYes, onCancel }) {
  return (
    <div>
      <Modal open={open} set={set} div="w-full max-w-sm">
        <Box className=" animate-pop">
          <h2 className="dark:text-slate-100">{text || "Are you sure?"}</h2>
          <div className="flex items-center gap-3 justify-between ">
            <ButtonWarm
              className="mb-0 w-full max-w-[100px] "
              onClick={() => {
                onYes?.();
                set?.(false);
              }}
            >
              yes
            </ButtonWarm>
            <ButtonSec
              className="mb-0 w-full max-w-[100px] "
              onClick={() => {
                set?.(false);
                onCancel?.();
              }}
            >
              cancel
            </ButtonSec>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
