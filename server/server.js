import express from "express";
import { db, auth } from "./src/configure/firebase.js";
import cors from "cors";
const app = express();
import { getAuth } from "firebase-admin/auth";

app.use(cors());
app.use(express.json());

async function checkUserExistenceAndCreate(
  email,
  password,
  firstName,
  lastName
) {
  const auth = getAuth();
  try {
    const userRecord = await auth.getUserByEmail(email);
    console.log(`User already exists: ${userRecord.toJSON()}`);
    return { error: "User already exists" };
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      try {
        const userRecord = await auth.createUser({
          email,
          password,
          displayName: `${firstName} ${lastName}`,
        });
        const userRef = db.collection("users").doc(userRecord.uid);
        await userRef.set({
          firebaseId: userRecord.uid,
          email,
          firstName,
          lastName,
        });

        const token = await auth.createCustomToken(userRecord.uid);
        return { user: userRecord, token };
      } catch (createError) {
        console.error("Error creating user:", createError);
        return { error: "Error creating user" };
      }
    } else {
      console.error("Unexpected error:", error);
      return { error: "Error checking user existence" };
    }
  }
}

app.post("/api/sendPasswordReset", async (req, res) => {
  const { email } = req.body;

  try {
    const auth = getAuth();
    const userRecord = await auth.getUserByEmail(email);

    if (userRecord) {
      return res.status(200).send({ message: "Password reset email sent!" });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error handling password reset:", error);
    return res.status(500).send({
      message: "Error processing password reset request",
      error: error.message,
    });
  }
});

app.post("/api/users/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const result = await checkUserExistenceAndCreate(
      email,
      password,
      firstName,
      lastName
    );
    if (result.error) {
      return res.status(409).send({ message: result.error });
    }

    const { user, token } = result;
    return res.status(201).send({
      message: "User created successfully",
      user: {
        firebaseId: user.uid,
        email,
        firstName,
        lastName,
      },
      token,
    });
  } catch (error) {
    console.error("Error during sign up:", error);
    return res
      .status(500)
      .send({ message: "Error during sign up", error: error.message });
  }
});

// Login Route
app.post("/api/users/login", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const userRecord = await auth.getUserByEmail(email);
    const token = await auth.createCustomToken(userRecord.uid);

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        firebaseId: userRecord.uid,
        email: userRecord.email,
        firstName: userRecord.displayName?.split(" ")[0] || "",
        lastName: userRecord.displayName?.split(" ")[1] || "",
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

app.post("/api/users/saveResume", async (req, res) => {
  const { userId, base64PDF } = req.body;

  if (!userId || !base64PDF) {
    return res.status(400).send("Missing userId or base64PDF in request body.");
  }

  try {
    const userRef = db.collection("resumes").doc(userId);
    await userRef.set({ resume: base64PDF }, { merge: true });

    return res.status(200).send("Resume saved successfully!");
  } catch (error) {
    console.error("Error saving resume:", error);
    return res.status(500).send("Error saving resume.");
  }
});
app.get("/api/users/getResume", async (req, res) => {
  const { userId } = req.query;  

  if (!userId) {
    return res.status(400).send("Missing userId in query parameters.");
  }

  try {
    const userRef = db.collection("resumes").doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).send("No resume found for this user.");
    }

    const resumeData = doc.data().resume;

    return res.status(200).send(resumeData);
  } catch (error) {
    console.error("Error fetching resume:", error);
    return res.status(500).send("Error fetching resume.");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
