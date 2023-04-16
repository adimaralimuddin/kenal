import { useState } from "react";
import useProfile from "../../controls/useProfile";
import useRelations from "../../controls/useRelations";
import Box from "../elements/Box";
import ButtonPrim from "../elements/ButtonPrim";
import Modal from "../elements/Modal";

const date = new Date();

export default function UserAbout({ profile, authId, profileSettings }) {
  const privacy = profileSettings?.seeAbout;
  const { set, update, user } = useProfile();
  const [open, setOpen] = useState();
  const { isFollowings } = useRelations();

  const onUpdate = async () => {
    await update(profile);
    setOpen(false);
  };

  function set_(obj) {
    set((p) => ({ data: { ...p?.data, ...obj } }));
  }

  if (!user?.uid) return;

  if (privacy == "Only_me" && authId !== profile?.id) {
    return null;
  }

  if (privacy == "Followers" && authId !== profile?.id) {
    if (!isFollowings(undefined, profile?.id)) {
      return null;
    }
  }

  return (
    <div className="flex-1 text-gray-500  min-w-[35%] ">
      <div className="box box-ringd text-sm ">
        <h2 className=" text-h2 font-medium text-[1.1rem] px-3 ">About</h2>
        <div className=" flex gap-3 flex-wrap ">
          <div className="p-2 flex-1d ">
            {Object.entries(profile?.data || {})?.map((f) => (
              <p className="" key={f?.[0]}>
                {f?.[0]} : <span className="ml-2  text-blue-400">{f?.[1]}</span>
              </p>
            ))}

            {Object.entries(profile?.data || {})?.length == 0 && (
              <p className="text-center pt-2"> No Data yet!</p>
            )}
          </div>
          {profile?.id == authId && (
            <button
              className="btn-prime ml-auto self-end"
              onClick={(_) => setOpen(true)}
            >
              Edit About
            </button>
          )}
        </div>
      </div>

      <Modal open={open} set={setOpen}>
        <Box className="flex flex-col gap-2 text-gray-500 bg-whites p-[1.5rem]">
          <span className="flex flex-col  bg-white dark:bg-d1  rounded-lg ">
            <label className="px-2">Bio</label>
            <input
              defaultValue={profile?.data?.bio}
              pattern="\d{4} \d{4} \d{4} \d{4}"
              onInput={(e) => set_({ bio: e.target?.value })}
              className="ring-1 ml-2 flex-1 dark:ring-d3"
              type="text"
            />
          </span>
          <GenderStatus set={set_} data={profile?.data} />
          <Dob set={set_} data={profile?.data} />
          <Address set={set_} data={profile?.data} />
          <Other set={set_} data={profile?.data} />
          <ButtonPrim className="w-full max-w-none" onClick={onUpdate}>
            Save
          </ButtonPrim>
        </Box>
      </Modal>
    </div>
  );
}

function GenderStatus({ set, data }) {
  return (
    <div className="flex gap-3 px-1 bg-white dark:bg-d1 rounded-lg p-2 flex-wrap">
      <span className="flex flex-col flex-1  ">
        <label className="px-2">gender</label>
        <select
          defaultValue={data?.gender}
          onSelect={(e) => set({ gender: e.target?.value })}
          className="ring-1 ml-1 flex-1  ring-slate-200 dark:ring-d3"
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </span>

      <span className="flex-1 flex-col flex ">
        <label
          className="px-2"
          onSelect={(e) => set({ status: e.target?.value })}
        >
          status
        </label>
        <select
          defaultValue={data?.status}
          className="ring-1 ml-1  flex-1  ring-slate-200 dark:ring-d3"
        >
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
    <div className="bg-white ">
      <div className="flex items-center flex-wrap gap-2">
        <span className="whitespace-nowrap flex flex-col flex-colf flex-1">
          <label className="px-2">Birth Date </label>
          <input
            defaultValue={data?.birth_date}
            onInput={(e) => set({ birth_date: e.target.value })}
            max={date?.toISOString()?.split("T")?.[0]}
            min="1970-01-01"
            className="ring-1 ml-1 flex-1  ring-slate-200 dark:ring-d3"
            type="date"
          />
        </span>
        <span className="whitespace-nowrap  flex-col flex flex-colf  flex-1">
          <label className="px-2">Birth Place</label>
          <input
            defaultValue={data?.birth_place}
            onInput={(e) => set({ birth_place: e.target?.value })}
            className="ring-1 ml-1 flex-1  ring-slate-200 dark:ring-d3"
            type="text"
            placeholder=""
          />
        </span>
      </div>
    </div>
  );
}

function Address({ set, data }) {
  return (
    <div className="bg-white dark:bg-d1 rounded-lg">
      {/* <h3 className="font-semibold text-center">Address</h3> */}
      <div className="flex flex-wrap">
        <span className="whitespace-nowrap flex flex-col flex-1">
          <label className="px-2">Country</label>
          <input
            defaultValue={data?.country}
            onInput={(e) => set({ country: e.target?.value })}
            className="ring-1 ml-1 flex-1  ring-slate-200 dark:ring-d3"
            type="text"
            placeholder=""
          />
        </span>
        <span className="mx-1"></span>
        <span className="whitespace-nowrap flex flex-col flex-1">
          <label className="px-2">City</label>
          <input
            defaultValue={data?.city}
            onInput={(e) => set({ city: e.target?.value })}
            className="ring-1 ml-1 flex-1  ring-slate-200 dark:ring-d3"
            type="text"
            placeholder=""
          />
        </span>
      </div>
    </div>
  );
}
function Other({ set, data }) {
  return (
    <div>
      <div className="flex flex-wrap">
        <span className="whitespace-nowrap flex flex-col flex-1">
          <label className="px-2">Education</label>
          <input
            defaultValue={data?.education}
            onInput={(e) => set({ education: e.target?.value })}
            className="ring-1 ring-slate-200 dark:ring-d3 ml-2 flex-1"
            type="text"
            placeholder=""
          />
        </span>
        <span className="mx-1"></span>
        <span className="whitespace-nowrap flex flex-col flex-1">
          <label className="px-2">Job</label>
          <input
            defaultValue={data?.job}
            onInput={(e) => set({ job: e.target?.value })}
            className="ring-1  ring-slate-200 dark:ring-d3 ml-2 flex-1"
            type="text"
            placeholder=""
          />
        </span>
      </div>
    </div>
  );
}
