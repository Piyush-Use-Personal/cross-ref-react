export const convertCrossRef = (list) => {
  console.log({ list });
  return list.message.items.map((e) => {
    return {
      title: e.title?.join(),
      publisher: e.publisher,
      abstract: e.abstract,
      type: e.type,
      conditionalUrl: e.URL,
      subject: e.subject?.join(),
      url: `https://doi.org/${e.DOI}`,
    };
  });
};

export default {};
