const { default: axios } = require('axios');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const getAbstractFromURL = (metas) => {
  for (let i = 0; i < metas.length; i += 1) {
    if (
      ['dc.description', 'og:description'].includes(
        metas[i].getAttribute('name')?.toLowerCase(),
      ) ||
      ['dc.description', 'og:description'].includes(
        metas[i].getAttribute('property')?.toLowerCase(),
      )
    ) {
      const abstract = metas[i].getAttribute('content');
      return abstract;
    }
  }
  return '';
};

const scrap = async (req, res) => {
  try {
    const data = await axios(req.query.URL);
    const dom = new JSDOM(data.data);
    const metas = dom.window.document.getElementsByTagName('meta');
    let abstract = getAbstractFromURL(metas);

    if (!abstract) {
      const innerUrl = dom.window.document.getElementById('redirectURL').value;
      const preData = await axios(decodeURIComponent(innerUrl));
      const innerDom = new JSDOM(preData.data);
      const innerMetas = innerDom.window.document.getElementsByTagName('meta');
      abstract = getAbstractFromURL(innerMetas);
    }
    res.status(200).send({
      abstract,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

module.exports = {
  scrap,
};
