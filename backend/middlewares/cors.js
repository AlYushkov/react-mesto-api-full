const ALLOWED_CORS = ['http://localhost:3000',
  'https://mesta.students.nomoredomains.club',
  'https://www.mesta.students.nomoredomains.club',
  'http://mesta.students.nomoredomains.club',
  'http://www.mesta.students.nomoredomains.club',
  'https://github.com/AlYushkov/react-mesto-api-full',
];
const ALLOWED_METHODS = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const reqHeaders = req.headers['access-control-request-headers'];
  const { method } = req;
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', reqHeaders);
    return res.send(); // no more headers sending
  }
  return next();
};

module.exports = { cors };
