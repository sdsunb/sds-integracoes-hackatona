import { Router } from "express";
import { LoginController } from "./controllers/LoginController";
import { VersionController } from "./controllers/VersionController";
import { UserController } from "./controllers/UserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { OutbreakController } from "./controllers/OutbreakController";
import { ValidateSpreadsheetController } from "./controllers/ValidateSpreadsheetController";
import { uploadFile } from "./middlewares/multer";
import { clearDirectory } from "./middlewares/clearDirectory";

const router = Router();

const loginController = new LoginController();
const versionController = new VersionController();
const userController = new UserController();
const outbreakController = new OutbreakController();
const validateSpreadsheetController = new ValidateSpreadsheetController();

router.post("/login", loginController.handle);
router.get("/version", versionController.handle);
router.get("/user", ensureAuthenticated, userController.handle);
router.get("/outbreak/:outbreakId", ensureAuthenticated, outbreakController.handle);
router.post("/validateSpreadsheet/:origin", ensureAuthenticated, clearDirectory, uploadFile.single('file'), validateSpreadsheetController.handle);

export { router }
