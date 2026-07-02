import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import visasRouter from "./visas";
import servicesRouter from "./services";
import toursRouter from "./tours";
import testimonialsRouter from "./testimonials";
import blogRouter from "./blog";
import faqsRouter from "./faqs";
import eligibilityRouter from "./eligibility";
import leadsRouter from "./leads";
import embassyUpdatesRouter from "./embassy-updates";
import newsletterRouter from "./newsletter";
import settingsRouter from "./settings";
import statsRouter from "./stats";
import adminRouter from "./admin";
import { requireAuth } from "../middlewares/require-auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/visas", visasRouter);
router.use("/services", servicesRouter);
router.use("/tours", toursRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/blog", blogRouter);
router.use("/faqs", faqsRouter);
router.use("/eligibility", eligibilityRouter);
router.use("/leads", leadsRouter);
router.use("/embassy-updates", embassyUpdatesRouter);
router.use("/newsletter", newsletterRouter);
router.use("/settings", settingsRouter);
router.use("/stats", statsRouter);
router.use("/admin", requireAuth, adminRouter);

export default router;
