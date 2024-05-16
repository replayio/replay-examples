import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // this will add variability to our test that will make it flaky
  // simulates a varying response time
  const timeout = Math.random() < 0.5 ? 500 : 0;

  setTimeout(() => {
    res.json({ available: true, qty: 1 });
  }, timeout);
};
