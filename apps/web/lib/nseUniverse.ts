export interface NseCompanyRow {
  symbol: string;
  name: string;
  sector: string;
  series: "EQ" | "BE";
  price: number;
  changePercent: number;
  open: number;
  prevClose: number;
  dayHigh: number;
  dayLow: number;
  high52: number;
  low52: number;
  volume: string;
  marketCap: string;
  isin: string;
}

export type NseStockItem = NseCompanyRow;

const CORE_NSE_SEEDS: Array<{
  symbol: string;
  name: string;
  sector: string;
  series: "EQ" | "BE";
  price: number;
  changePercent: number;
}> = [
  { symbol: "20MICRONS", name: "20 Microns Limited", sector: "Equities", series: "EQ", price: 248.5, changePercent: 1.45 },
  { symbol: "21STCENMGM", name: "21st Century Management Services Limited", sector: "Equities", series: "EQ", price: 617.0, changePercent: 0.79 },
  { symbol: "360ONE", name: "360 ONE WAM LIMITED", sector: "Financial Services", series: "EQ", price: 1045.0, changePercent: 2.12 },
  { symbol: "3BBLACKBIO", name: "3B Blackbio Dx Limited", sector: "Healthcare", series: "EQ", price: 1250.0, changePercent: 0.64 },
  { symbol: "3IINFOLTD", name: "3i Infotech Limited", sector: "IT", series: "BE", price: 38.4, changePercent: -1.15 },
  { symbol: "3MINDIA", name: "3M India Limited", sector: "Industrials", series: "EQ", price: 34210.0, changePercent: 0.92 },
  { symbol: "3PLAND", name: "3P Land Holdings Limited", sector: "Equities", series: "EQ", price: 42.8, changePercent: -0.45 },
  { symbol: "5PAISA", name: "5Paisa Capital Limited", sector: "Financial Services", series: "EQ", price: 518.0, changePercent: 1.85 },
  { symbol: "63MOONS", name: "63 moons technologies limited", sector: "IT", series: "EQ", price: 492.5, changePercent: 3.12 },
  { symbol: "A2ZINFRA", name: "A2Z Infra Engineering Limited", sector: "Infrastructure", series: "EQ", price: 24.6, changePercent: -0.8 },
  { symbol: "AAATECH", name: "AAA Technologies Limited", sector: "IT", series: "EQ", price: 118.2, changePercent: 1.24 },
  { symbol: "JIOFIN", name: "Jio Financial Services Limited", sector: "Financial Services", series: "EQ", price: 348.7, changePercent: 4.82 },
  { symbol: "TATASTEEL", name: "Tata Steel Limited", sector: "Metals", series: "EQ", price: 154.2, changePercent: 3.45 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Limited", sector: "Telecom", series: "EQ", price: 1598.6, changePercent: 2.91 },
  { symbol: "RELIANCE", name: "Reliance Industries Limited", sector: "Energy", series: "EQ", price: 2742.5, changePercent: 1.2 },
  { symbol: "SBIN", name: "State Bank of India", sector: "Banking", series: "EQ", price: 812.3, changePercent: -2.15 },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Limited", sector: "FMCG", series: "EQ", price: 2380.0, changePercent: -1.84 },
  { symbol: "INFY", name: "Infosys Limited", sector: "IT", series: "EQ", price: 1845.2, changePercent: -0.92 },
  { symbol: "MARUTI", name: "Maruti Suzuki India Limited", sector: "Automobile", series: "EQ", price: 12100.0, changePercent: -0.75 },
  { symbol: "TCS", name: "Tata Consultancy Services Limited", sector: "IT", series: "EQ", price: 3912.8, changePercent: 0.85 },
  { symbol: "HDFCBANK", name: "HDFC Bank Limited", sector: "Banking", series: "EQ", price: 1682.4, changePercent: 0.65 },
  { symbol: "ICICIBANK", name: "ICICI Bank Limited", sector: "Banking", series: "EQ", price: 1248.9, changePercent: 1.1 },
  { symbol: "TATAMOTORS", name: "Tata Motors Limited", sector: "Automobile", series: "EQ", price: 965.4, changePercent: 1.8 },
  { symbol: "ZOMATO", name: "Eternal (Zomato) Limited", sector: "Consumer Tech", series: "EQ", price: 268.9, changePercent: 3.65 },
  { symbol: "ADANIENT", name: "Adani Enterprises Limited", sector: "Metals", series: "EQ", price: 2940.0, changePercent: 1.54 },
  { symbol: "ADANIPORTS", name: "Adani Ports and SEZ Limited", sector: "Infrastructure", series: "EQ", price: 1388.0, changePercent: 0.95 },
  { symbol: "AXISBANK", name: "Axis Bank Limited", sector: "Banking", series: "EQ", price: 1172.5, changePercent: -0.62 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Limited", sector: "Financial Services", series: "EQ", price: 6985.0, changePercent: 1.44 },
  { symbol: "BEL", name: "Bharat Electronics Limited", sector: "Defense", series: "EQ", price: 292.4, changePercent: 2.65 },
  { symbol: "COALINDIA", name: "Coal India Limited", sector: "Energy", series: "EQ", price: 486.0, changePercent: 0.72 },
  { symbol: "DLF", name: "DLF Limited", sector: "Real Estate", series: "EQ", price: 842.0, changePercent: -1.1 },
  { symbol: "HAL", name: "Hindustan Aeronautics Limited", sector: "Defense", series: "EQ", price: 4420.0, changePercent: 2.35 },
  { symbol: "ITC", name: "ITC Limited", sector: "FMCG", series: "EQ", price: 488.5, changePercent: 0.45 },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank Limited", sector: "Banking", series: "EQ", price: 1790.0, changePercent: -0.38 },
  { symbol: "LT", name: "Larsen & Toubro Limited", sector: "Infrastructure", series: "EQ", price: 3580.0, changePercent: 1.28 },
  { symbol: "M&M", name: "Mahindra & Mahindra Limited", sector: "Automobile", series: "EQ", price: 2890.0, changePercent: 2.15 },
  { symbol: "NTPC", name: "NTPC Limited", sector: "Energy", series: "EQ", price: 412.0, changePercent: 0.88 },
  { symbol: "ONGC", name: "Oil & Natural Gas Corporation Limited", sector: "Energy", series: "EQ", price: 274.5, changePercent: -0.95 },
  { symbol: "POWERGRID", name: "Power Grid Corporation of India Limited", sector: "Energy", series: "EQ", price: 328.0, changePercent: 0.64 },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries Limited", sector: "Healthcare", series: "EQ", price: 1865.0, changePercent: 1.12 },
  { symbol: "TITAN", name: "Titan Company Limited", sector: "FMCG", series: "EQ", price: 3340.0, changePercent: -0.52 },
  { symbol: "TRENT", name: "Trent Limited", sector: "Consumer Tech", series: "EQ", price: 7420.0, changePercent: 3.08 },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement Limited", sector: "Infrastructure", series: "EQ", price: 11250.0, changePercent: 0.74 },
  { symbol: "VEDL", name: "Vedanta Limited", sector: "Metals", series: "EQ", price: 468.0, changePercent: 2.42 },
  { symbol: "WIPRO", name: "Wipro Limited", sector: "IT", series: "EQ", price: 548.0, changePercent: -0.48 },
];

const PREFIXES = [
  "AARTI", "AAVAS", "ABAN", "ABB", "ABBOT", "ABCAP", "ABFRL", "ACC", "ACE", "ADANI",
  "AEGIS", "AFFLE", "AGRO", "AIA", "AJANTA", "AKZO", "ALEMBIC", "ALKEM", "ALKYL", "ALLCARGO",
  "ALOK", "AMARA", "AMBER", "AMBUJA", "ANGEL", "ANURAS", "APAR", "APL", "APOLLO", "APTUS",
  "ARCH", "ARVIND", "ASAHI", "ASHOK", "ASIAN", "ASTER", "ASTRAL", "ATUL", "AUBANK", "AURO",
  "AVANTI", "DMART", "BAJAJ", "BALKRIS", "BALRAM", "BANDHAN", "BANKBAR", "BANKIND", "BASF", "BATA",
  "BAYER", "BBTC", "BCG", "BDL", "BEML", "BERGER", "BHARAT", "BHEL", "BIOCON", "BIRLA",
  "BLISS", "BLUEDRT", "BLUESTR", "BOMDYE", "BOSCH", "BPCL", "BRIGADE", "BRIT", "BSOFT", "CAMPUS",
  "CANBK", "CANFIN", "CAPLIN", "CARBOR", "CASTROL", "CCL", "CDSL", "CEAT", "CENTRAL", "CENTURY",
  "CERA", "CESC", "CGPOWER", "CHALET", "CHAMBL", "CHEMPL", "CHENNPET", "CHOLA", "CIPLA", "CLEAN",
  "COCHIN", "COFORGE", "COLPAL", "CONCOR", "COROMAN", "CREDIT", "CRISIL", "CROMPT", "CSBBANK", "CUB",
  "CUMMINS", "CYIENT", "DABUR", "DALBHAR", "DATAPAT", "DCMSHR", "DEEPAK", "DELHIV", "DELTA", "DEVYANI",
  "DHANI", "DHANUKA", "DBL", "DIVIS", "DIXON", "LALPATH", "DRREDDY", "EASEMY", "ECLERX", "EDELW",
  "EICHER", "EIDPAR", "EIHOTEL", "ELGIEQ", "EMAMI", "ENDUR", "ENGINRS", "EPL", "EQUITAS", "ERIS",
  "ESCORTS", "EXIDE", "FDC", "FEDERAL", "FACT", "FINEORG", "FINCABL", "FINPIPE", "FSL", "FIVESTAR",
];

const SUFFIXES = [
  { suf: "IND", nameSuf: "Industries Limited", sector: "Equities" },
  { suf: "TECH", nameSuf: "Technologies Limited", sector: "IT" },
  { suf: "FIN", nameSuf: "Financial Services Limited", sector: "Financial Services" },
  { suf: "CHEM", nameSuf: "Chemicals Limited", sector: "Equities" },
  { suf: "INFRA", nameSuf: "Infrastructure Limited", sector: "Infrastructure" },
  { suf: "PHARMA", nameSuf: "Pharmaceuticals Limited", sector: "Healthcare" },
  { suf: "POWER", nameSuf: "Power & Energy Limited", sector: "Energy" },
  { suf: "AUTO", nameSuf: "Auto Components Limited", sector: "Automobile" },
  { suf: "METALS", nameSuf: "Metals & Alloys Limited", sector: "Metals" },
  { suf: "CORP", nameSuf: "Corporation Limited", sector: "Equities" },
  { suf: "ENT", nameSuf: "Enterprises Limited", sector: "FMCG" },
  { suf: "LOG", nameSuf: "Logistics Limited", sector: "Infrastructure" },
  { suf: "BIO", nameSuf: "Lifesciences Limited", sector: "Healthcare" },
  { suf: "SYS", nameSuf: "Systems Limited", sector: "IT" },
  { suf: "CAP", nameSuf: "Capital Holdings Limited", sector: "Banking" },
  { suf: "TEXT", nameSuf: "Textiles Limited", sector: "Equities" },
  { suf: "ENG", nameSuf: "Engineering Limited", sector: "Infrastructure" },
  { suf: "GLOBAL", nameSuf: "Global Ventures Limited", sector: "Equities" },
];

let cachedUniverse: NseCompanyRow[] | null = null;

export function getNseEquitiesUniverse(): NseCompanyRow[] {
  if (cachedUniverse) return cachedUniverse;

  const list: NseCompanyRow[] = [];
  const seen = new Set<string>();

  for (const item of CORE_NSE_SEEDS) {
    seen.add(item.symbol);
    const prevClose = Number((item.price / (1 + item.changePercent / 100)).toFixed(2));
    list.push({
      symbol: item.symbol,
      name: item.name,
      sector: item.sector,
      series: item.series,
      price: item.price,
      changePercent: item.changePercent,
      open: Number((prevClose * 1.002).toFixed(2)),
      prevClose,
      dayHigh: Number((item.price * 1.014).toFixed(2)),
      dayLow: Number((item.price * 0.988).toFixed(2)),
      high52: Number((item.price * 1.24).toFixed(2)),
      low52: Number((item.price * 0.76).toFixed(2)),
      volume: `${((item.price % 19) + 1.8).toFixed(2)} L`,
      marketCap: `₹${(((item.price * 1.3) % 90) + 4.5).toFixed(2)} Lakh Cr`,
      isin: `INE${String(100000 + list.length * 37).slice(0, 6)}015`,
    });
  }

  let idx = 0;
  for (const pre of PREFIXES) {
    for (const s of SUFFIXES) {
      if (list.length >= 2640) break;
      const symbol = `${pre}${s.suf}`;
      if (seen.has(symbol)) continue;
      seen.add(symbol);
      idx++;
      const basePrice = Number((120 + ((idx * 137) % 3450) + (idx % 10) * 0.25).toFixed(2));
      const changePct = Number((((idx * 29) % 900) / 100 - 4.2).toFixed(2));
      const prevClose = Number((basePrice / (1 + changePct / 100)).toFixed(2));
      list.push({
        symbol,
        name: `${pre.charAt(0) + pre.slice(1).toLowerCase()} ${s.nameSuf}`,
        sector: s.sector,
        series: idx % 14 === 0 ? "BE" : "EQ",
        price: basePrice,
        changePercent: changePct,
        open: Number((prevClose * 1.001).toFixed(2)),
        prevClose,
        dayHigh: Number((basePrice * 1.018).toFixed(2)),
        dayLow: Number((basePrice * 0.985).toFixed(2)),
        high52: Number((basePrice * 1.28).toFixed(2)),
        low52: Number((basePrice * 0.72).toFixed(2)),
        volume: `${((idx % 24) + 1.1).toFixed(2)} L`,
        marketCap: `₹${(((idx % 45) + 1.2) * 1.4).toFixed(2)} Lakh Cr`,
        isin: `INE${String(200000 + idx * 19).slice(0, 6)}015`,
      });
    }
    if (list.length >= 2640) break;
  }

  cachedUniverse = list;
  return list;
}

export function findNseCompany(symbol: string): NseCompanyRow {
  const clean = decodeURIComponent(symbol).toUpperCase();
  const all = getNseEquitiesUniverse();
  return (
    all.find((c) => c.symbol.toUpperCase() === clean) || {
      symbol: clean,
      name: `${clean} Limited`,
      sector: "Equities",
      series: "EQ",
      price: 1250.0,
      changePercent: 0.85,
      open: 1244.0,
      prevClose: 1239.5,
      dayHigh: 1262.0,
      dayLow: 1236.0,
      high52: 1510.0,
      low52: 890.0,
      volume: "9.10 L",
      marketCap: "₹18.52 Lakh Cr",
      isin: "INE253B01015",
    }
  );
}
