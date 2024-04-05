const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
const { calculateGoldProfitForUser } = require("../controllers/assetController")
const { PEP,RBACMiddleware,ABACMiddleware,ChineseWallPolicy,PDP } = require("../utils/PolicyEnforcementPoint");
const rbacMiddleware = new RBACMiddleware();
const isNaive = require("../middlewares/isNaive");

router.post("/add",isNaive,rbacMiddleware.execute("create_asset"),PDP.execute,assetController.addAsset);
router.get("/real-estate-difference",isNaive,rbacMiddleware.execute("read_asset"),PDP.execute,assetController.calculateRealEstateDifferenceForUser);
router.get("/fd-difference",isNaive,rbacMiddleware.execute("read_asset"),PDP.execute,assetController.calculateFDDifferenceForUser);
router.get("/gold/profit",isNaive,rbacMiddleware.execute("read_asset"),PDP.execute,calculateGoldProfitForUser);
router.get("/investment-risk",isNaive,rbacMiddleware.execute("read_asset"),PDP.execute,assetController.calculateSharpeRatio);

module.exports = router;