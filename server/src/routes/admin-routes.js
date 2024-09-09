import express from "express";
import {
  addAdmin,
  adminLogin,
  getAdmin,
  validateAdmin,
} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations including signup, login, and listing.
 */

/**
 * @swagger
 * /admin/signup:
 *   post:
 *     summary: Register a new admin
 *     description: Create a new admin account with email and password. Ensure email format and password length.
 *     tags: [Admin]
 *     requestBody:
 *       description: Admin credentials for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email address.
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 description: Admin's password.
 *                 example: securePassword123
 *     responses:
 *       201:
 *         description: Admin account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin account created successfully.
 *                 admin:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: Email of the created admin.
 *                     id:
 *                       type: string
 *                       description: Unique identifier for the admin.
 *       400:
 *         description: Validation errors or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed or email already exists.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing your request.
 *                 error:
 *                   type: string
 */
adminRouter.post("/signup", validateAdmin, addAdmin);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     description: Authenticate admin and return a JWT token. Requires email and password.
 *     tags: [Admin]
 *     requestBody:
 *       description: Admin credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email address.
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 description: Admin's password.
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Authentication successful, JWT token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication successful.
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated access.
 *                 id:
 *                   type: string
 *                   description: Admin's unique identifier.
 *       401:
 *         description: Invalid credentials or admin not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials or admin not found.
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing your request.
 *                 error:
 *                   type: string
 */
adminRouter.post("/login", validateAdmin, adminLogin);

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: List all admins
 *     description: Retrieve a list of all admin accounts.
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of admins retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admins:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         description: Admin's email address.
 *                       id:
 *                         type: string
 *                         description: Admin's unique identifier.
 *       404:
 *         description: No admins found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No admins found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing your request.
 *                 error:
 *                   type: string
 */
adminRouter.get("/", getAdmin);

export default adminRouter;
