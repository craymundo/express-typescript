import { Router } from "express";
import passport from "passport";

const router = Router();

import { getAll, create, deleteQuestionnaire,update, findById } from "../controller/questionnaire.controller";

router.get(
  "/questionnaire",
  passport.authenticate("jwt", { session: false }),
  getAll
);

router.get(
  "/questionnaire/find/:id",
  passport.authenticate("jwt", { session: false }),
  findById
);

router.post(
  "/questionnaire",
  passport.authenticate("jwt", { session: false }),
  create
);

router.delete(
  "/questionnaire/:id",
  passport.authenticate("jwt", { session: false }),
  deleteQuestionnaire
);

router.put(
  "/questionnaire/:id",
  passport.authenticate("jwt", { session: false }),
  update
);

export default router;