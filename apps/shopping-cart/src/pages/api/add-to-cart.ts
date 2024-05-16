import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.qty) {
    res.json({ success: true });
  } else {
    res.status(400);
    res.json({
      message: 'Cannot add 0 items to cart!',
    });
    res.send(400);
  }
};
