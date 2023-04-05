const toolSnapToDoc = (snap) => {
  if (!snap) return snap;
  const doc = { id: snap?.id, ...snap?.data() };
  return doc;
};

export default toolSnapToDoc;
