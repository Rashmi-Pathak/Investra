import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface DbState {
  orders: any[];
  holdings: any[];
  walletBalance: number;
  lastUpdated: string;
}

function getDatabasePath(): string {
  const candidate1 = path.resolve(process.cwd(), "../../database/sqlite/orders_database.json");
  const candidate2 = path.resolve(process.cwd(), "database/sqlite/orders_database.json");
  const candidate3 = path.resolve(process.cwd(), ".next/orders_database.json");

  try {
    const dir1 = path.dirname(candidate1);
    if (fs.existsSync(dir1)) return candidate1;
  } catch {}

  try {
    const dir2 = path.dirname(candidate2);
    if (fs.existsSync(dir2)) return candidate2;
  } catch {}

  return candidate3;
}

function readDb(): DbState {
  const dbPath = getDatabasePath();
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading orders database:", err);
  }
  return {
    orders: [],
    holdings: [],
    walletBalance: 100000,
    lastUpdated: new Date().toISOString(),
  };
}

function writeDb(data: DbState): void {
  const dbPath = getDatabasePath();
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing orders database:", err);
  }
}

// GET /api/orders - Fetch stored orders and holdings
export async function GET() {
  const db = readDb();
  return NextResponse.json({
    ok: true,
    orders: db.orders,
    holdings: db.holdings,
    walletBalance: db.walletBalance,
    lastUpdated: db.lastUpdated,
  });
}

// POST /api/orders - Record new trade order & update holdings
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order, holdings, walletBalance } = body;

    const db = readDb();

    if (order) {
      // Prepend order if not already stored
      const exists = db.orders.some((o: any) => o.id === order.id);
      if (!exists) {
        db.orders.unshift(order);
      }
    }

    if (holdings && Array.isArray(holdings)) {
      db.holdings = holdings;
    }

    if (typeof walletBalance === "number") {
      db.walletBalance = walletBalance;
    }

    db.lastUpdated = new Date().toISOString();
    writeDb(db);

    return NextResponse.json({
      ok: true,
      message: "Order and holdings successfully persisted to database",
      orders: db.orders,
      holdings: db.holdings,
      walletBalance: db.walletBalance,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Failed to persist order" },
      { status: 500 }
    );
  }
}
