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
    const { title, description, expiresAt } = req.body;

    const market = await prisma.market.create({
      data: {
        description,
        expiresAt,
        title,
        yesPrice: 50,
        noPrice: 50,
        volume: 0,
        Outcome: "Niether",
        status: "active",
      },
    });
    return res.json(market);
  } catch (error) {
    console.error(error);
    return res.json({ error });
  }
});

app.post("/api/v1/admin/result", async (req, res) => {
  try {
    const { marketId, outcome } = req.body();
    await prisma.market.update({
      where: {
        id: marketId,
      },
      data: {
        status: "resolved",
        Outcome: outcome,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.get("/api/v1/markets", async (req, res) => {
  try {
    const markets = await prisma.market.findMany({
      where: {
        status: "active",
      },
    });
    return res.json(markets);
  } catch (error) {
    return res.json({ error });
  }
});
app.post("/api/v1/user/split", async (req, res) => {
  // split balance into yes and no
});
app.post("/api/v1/user/merge", async (req, res) => {
  // convert all yes and no shares to crypto
});
app.post("/api/v1/user/claim", async (req, res) => {
  try {
    const { marketId, userId } = req.body;

    const position = await prisma.position.findFirst({
      where: { userId, marketId },
      include: { market: true },
    });
    if (!position?.market) {
      res.json({ error: "market not found or not resolved, try again later" });
    }
    const marketOutcome = position?.market.Outcome;
    if (marketOutcome === "Niether")
      return res.json({ error: "market is result is neither " });
    let userRecived = 0;
    if (marketOutcome == "OutcomeA") {
      userRecived = position?.yesShares ?? 0;
    } else userRecived = position?.noShares ?? 0;

    // transfer winning to user wallet

    return res.json({ userRecived });
  } catch (error) {
    res.json({ error });
  }
});
app.post("/api/v1/user/onramp", async (req, res) => {
  // add money to wallet
});

// /api/v1/order/(limit/market)/type:yes/no,price:10c,qty:100
app.get("/api/v1/order/:orderType/:option/:price/:qty", async (req, res) => {
  const { option, orderType, price, qty } = req.params;
  // create new order limit / market
});

// api/v1/orderbook?type=yes/no
app.get("/api/v1/orderbook?type", async (req, res) => {
  try {
  } catch (error) {}
});
app.listen(3001, () => console.log("server running on port 3001"));
