import express from "express";
import jwt from "jsonwebtoken";
import prisma from "./prisma";
const app = express();

app.use(express.json());

app.post("/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: { email, password },
    });

    if (!user) {
      return res.json({ error: "no user found" });
    }
    var token = jwt.sign({ email: user.email }, process.env.SECRET_KEY!);
    res.cookie("token", token);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

app.post("/user/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    console.log(email, name, password);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    var token = jwt.sign({ email }, process.env.SECRET_KEY!);
    res.cookie("token", token);
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

app.post("/admin/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.admin.findFirst({
      where: { email, password },
    });

    if (!user) {
      return res.json({ error: "no admin found" });
    }
    var token = jwt.sign({ email: user.email }, process.env.SECRET_KEY!);
    res.cookie("token", token);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

app.post("/admin/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    console.log(email, name, password);
    const user = await prisma.admin.create({
      data: {
        email,
        name,
        password,
      },
    });
    var token = jwt.sign({ email }, process.env.SECRET_KEY!);
    res.cookie("token", token);
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

app.post("/api/v1/admin/market", async (req, res) => {
  try {
  } catch (error) {}
});

app.post("/api/v1/admin/result", async (req, res) => {
  try {
  } catch (error) {}
});

app.get("/api/v1/markets", async (req, res) => {});
app.post("/api/v1/user/split", async (req, res) => {});
app.post("/api/v1/user/merge", async (req, res) => {});
app.post("/api/v1/user/claim", async (req, res) => {});
app.post("/api/v1/user/onramp", async (req, res) => {});

// /api/v1/order/(limit/market)/type:yes/no,price:10c,qty:100
app.post("api");

// api/v1/orderbook?type=yes/no
app.get("/api");
app.listen(3001, () => console.log("server running on port 3001"));
