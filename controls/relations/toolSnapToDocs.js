const ToolSnapToDocs = (snap) => {
  return snap?.docs?.map((d) => ({ ...d.data(), id: d.id }));
};

export default ToolSnapToDocs;
