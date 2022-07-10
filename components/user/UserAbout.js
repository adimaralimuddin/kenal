import { useState } from "react";
import useProfile from "../../controls/useProfile";
import Box from "../elements/Box";
import ButtonPrim from "../elements/ButtonPrim";
import Modal from "../elements/Modal";

const date = new Date();

export default function UserAbout({ profile, authId }) {
  const [bio, setBio] = useState();
  const { set, update } = useProfile();
  const [open, setOpen] = useState();

  function set_(obj) {
    set((p) => ({ data: { ...p?.data, ...obj } }));
  }

  return (
    <div className="flex-1 text-gray-500  mx-autod min-w-[35%] ">
      <Box className="w-fulld text-sm">
        <p className="text-center text-md font-semibold">About</p>
        <div className="p-2">
          {Object.entries(profile?.data || {})?.map((f) => (
            <p className="">
              {f?.[0]} : <span className="ml-2  text-blue-400">{f?.[1]}</span>
            </p>
          ))}

          {Object.entries(profile?.data || {})?.length == 0 && (
            <p> No Data yet!</p>
          )}
        </div>
        {profile?.id == authId && (
          <ButtonPrim onClick={(_) => setOpen(true)}>edit about</ButtonPrim>
        )}
      </Box>

      <Modal open={open} set={setOpen}>
        <Box className="flex flex-col text-gray-500">
          <span dclassName="flex flex-col text-center">
            <label>Bio</label>
            <input
              defaultValue={profile?.data?.bio}
              pattern="\d{4} \d{4} \d{4} \d{4}"
              onInput={(e) => set_({ bio: e.target?.value })}
              className="ring-1 ml-2"
              type="text"
            />
          </span>
          <GenderStatus set={set_} data={profile?.data} />
          <Dob set={set_} data={profile?.data} />
          <Address set={set_} data={profile?.data} />
          <Other set={set_} data={profile?.data} />
          <ButtonPrim onClick={update}>Save</ButtonPrim>
        </Box>
      </Modal>
    </div>
  );
}

function GenderStatus({ set, data }) {
  return (
    <div dclassName="flex flex-wrap">
      <span>
        <label>gender</label>
        <select
          defaultValue={data?.gender}
          onSelect={(e) => set({ gender: e.target?.value })}
          className="ring-1 ml-1"
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </span>
      <span className="mx-1"></span>
      <span>
        <label onSelect={(e) => set({ status: e.target?.value })}>status</label>
        <select defaultValue={data?.status} className="ring-1 ml-1">
          <option value="single">single</option>
          <option value="relationship">in a relationship</option>
          <option value="married">married</option>
        </select>
      </span>
    </div>
  );
}

function Dob({ set, data }) {
  return (
    <>
      <hr />
      <h3 className="font-semibold text-center pt-3">Date & Place of Birth</h3>
      <div className="flex flex-wrap">
        <span className="whitespace-nowrap flex items-center flex-1">
          <label>Birth Date</label>
          {new Date().getDate()}
          <input
            defaultValue={data?.birth_date}
            onInput={(e) => set({ birth_date: e.target.value })}
            max={date?.toISOString()?.split("T")?.[0]}
            min="1970-01-01"
            className="ring-1 ml-2 flex-1"
            type="date"
            placeholder=""
          />
        </span>
        <span className="mx-1"></span>
        <span className="whitespace-nowrap flex items-center flex-1">
          <label>Birth Place</label>
          <input
            defaultValue={data?.birth_place}
            onInput={(e) => set({ birth_place: e.target?.value })}
            className="ring-1 ml-2 flex-1"
            type="text"
            placeholder=""
          />
        </span>
      </div>
    </>
  );
}

function Address({ set, data }) {
  return (
    <>
      <>
        <hr />
        <h3 className="font-semibold text-center pt-3">Address</h3>
        <div className="flex flex-wrap">
          <span className="whitespace-nowrap flex items-center flex-1">
            <label>Country</label>
            <input
              defaultValue={data?.country}
              onInput={(e) => set({ country: e.target?.value })}
              className="ring-1 ml-2 flex-1"
              type="text"
              placeholder=""
            />
          </span>
          <span className="mx-1"></span>
          <span className="whitespace-nowrap flex items-center flex-1">
            <label>City</label>
            <input
              defaultValue={data?.city}
              onInput={(e) => set({ city: e.target?.value })}
              className="ring-1 ml-2 flex-1"
              type="text"
              placeholder=""
            />
          </span>
        </div>
      </>
    </>
  );
}
function Other({ set, data }) {
  return (
    <>
      <hr />
      <h3 className="font-semibold text-center pt-3">Education & Job</h3>
      <div className="flex flex-wrap">
        <span className="whitespace-nowrap flex items-center flex-1">
          <label>Education</label>
          <input
            defaultValue={data?.education}
            onInput={(e) => set({ education: e.target?.value })}
            className="ring-1 ml-2 flex-1"
            type="text"
            placeholder=""
          />
        </span>
        <span className="mx-1"></span>
        <span className="whitespace-nowrap flex items-center flex-1">
          <label>Job</label>
          <input
            defaultValue={data?.job}
            onInput={(e) => set({ job: e.target?.value })}
            className="ring-1 ml-2 flex-1"
            type="text"
            placeholder=""
          />
        </span>
      </div>
    </>
  );
}
