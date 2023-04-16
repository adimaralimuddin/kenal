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
        <div className="box flex flex-col p-6 animate-pop gap-2">
          <h2 className="text-slate-600 dark:text-slate-100">
            {text || "Are you sure?"}
          </h2>
          <div className="flex  items-center gap-3 justify-between ">
            <button
              onClick={() => {
                onYes?.();
                set?.(false);
              }}
              className="btn-warm flex-1"
            >
              yes
            </button>
            {/* <ButtonWarm
              className="mb-0 w-full max-w-[100px] "
              onClick={() => {
                onYes?.();  
                set?.(false);
              }}
            >
              yes
            </ButtonWarm> */}
            <button
              className="btn-sec flex-1"
              onClick={() => {
                set?.(false);
                onCancel?.();
              }}
            >
              cancel
            </button>
            {/* <ButtonSec
              className="mb-0 w-full max-w-[100px] "
              onClick={() => {
                set?.(false);
                onCancel?.();
              }}
            >
              cancel
            </ButtonSec> */}
          </div>
        </div>
      </Modal>
    </div>
  );
}
