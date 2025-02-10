import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  createUserSchema,
  loginUserSchema,
  usersTable,
} from "../../db/userSchema";
import { db } from "../../db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    const hashedPasswords = await bcrypt.hash(data.password, 10);
    data.password = hashedPasswords;
    const [user] = await db.insert(usersTable).values(data).returning();

    // @ts-ignore
    delete user.password;

    if (!user) {
      res.status(400).json("Cannot create user");
      return;
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/login", validateData(loginUserSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(400).json("Invalid credentials");
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json("Invalid credentials");
      return;
    }

    const token = await jwt.sign(
      { id: user.id, role: user.role },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "30d",
      }
    );

    // @ts-ignore
    delete user.password;

    res.status(200).json({ user, token });
    return;
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
