import express from 'express';

import expressAsyncHandler from 'express-async-handler';
import Team from '../models/teamModel.js';

const teamRouter = express.Router();

teamRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const members = await Team.find();
    res.send(members);
  })
);

export default teamRouter;
