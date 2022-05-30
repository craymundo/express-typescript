import { Router } from "express";
import passport from "passport";

const router = Router();

import { getAll, create, deleteQuiz ,update, findById } from "../controller/quiz.controller";

router.get(
  "/quiz",
  passport.authenticate("jwt", { session: false }),
  getAll
);

router.get(
  "/quiz/find/:id",
  passport.authenticate("jwt", { session: false }),
  findById
);

router.post(
  "/quiz",
  passport.authenticate("jwt", { session: false }),
  create
);

router.delete(
  "/quiz/:id",
  passport.authenticate("jwt", { session: false }),
  deleteQuiz
);

router.put(
  "/quiz/:id",
  passport.authenticate("jwt", { session: false }),
  update
);

export default router;