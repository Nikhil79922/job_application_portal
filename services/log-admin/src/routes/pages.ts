import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { getLoginPage } from "../pages/login";
import { getDashboardPage } from "../pages/dashboard";
import { getServiceLogsPage } from "../pages/serviceLogs";
import { getErrorLogsPage } from "../pages/errorLogs";
import { getInfraPage } from "../pages/infrastructure";
import { getServiceDetailsPage } from "../pages/serviceDetails";
import { getArchitecturePage } from "../pages/architecture";

const router = Router();

router.get("/login", (_, res) => res.send(getLoginPage()));
router.get("/", authenticate, (_, res) => res.redirect("/dashboard"));
router.get("/dashboard", authenticate, (_, res) => res.send(getDashboardPage()));
router.get("/service-logs", authenticate, (_, res) => res.send(getServiceLogsPage()));
router.get("/error-logs", authenticate, (_, res) => res.send(getErrorLogsPage()));
router.get("/service-details", authenticate, (_, res) => res.send(getServiceDetailsPage()));
router.get("/infrastructure", authenticate, (_, res) => res.send(getInfraPage()));
router.get("/architecture", authenticate, (_, res) => res.send(getArchitecturePage()));

export default router;
