import { Router } from "express";
import { adminRegister,
    adminLogin
} from "../Controller/admin.controller.js";

import { createNewUser,fetchUserData, addMoneyToUser, withdrawMoneyFromUser, getSingleUser } from "../Controller/user.controller.js"

const router = Router();

router.route("/admin-register").post(adminRegister);
router.route("/admin-login").post(adminLogin);


router.route("/new-user").post(createNewUser);
router.route("/all-users").get(fetchUserData);

router.route("/user/:userId").get(getSingleUser);

router.route("/user/:userId/add").post(addMoneyToUser);
router.route("/user/:userId/withdraw").post(withdrawMoneyFromUser);

export default router;