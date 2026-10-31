"use client";

import React, { useEffect, useRef } from "react";

export interface CustomCandlePoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface HighchartsStockChartProps {
  symbol: string;
  basePrice?: number;
  height?: number;
  visibleCandlesCount?: number;
  customOhlcv?: (number[] | CustomCandlePoint)[];
  candles?: (number[] | CustomCandlePoint)[];
  timeframe?: string;
  indicators?: string[];
  lightTheme?: boolean;
}

export function generateDeterministicOhlcv(
  basePrice: number,
  count = 160
): number[][] {
  const now = Date.UTC(2026, 9, 31);
  const dayMs = 24 * 60 * 60 * 1000;
  const rows: number[][] = [];
  let cursor = basePrice * 0.86;

  for (let i = count; i >= 0; i--) {
    const ts = now - i * dayMs;
    const wave =
      Math.sin(i * 0.42) * (basePrice * 0.018) +
      Math.cos(i * 0.19) * (basePrice * 0.012);
    const open = Number(cursor.toFixed(2));
    const close = Number(
      Math.max(
        10,
        i === 0 ? basePrice : open + wave + (basePrice - cursor) * 0.04
      ).toFixed(2)
    );
    const high = Number(
      (
        Math.max(open, close) +
        Math.abs(wave) * 0.95 +
        basePrice * 0.008
      ).toFixed(2)
    );
    const low = Number(
      (
        Math.min(open, close) -
        Math.abs(wave) * 0.85 -
        basePrice * 0.007
      ).toFixed(2)
    );
    const vol = Math.round(
      14000000 + Math.abs(wave) * 950000 + ((i * 7919) % 28000000)
    );
    rows.push([ts, open, high, low, close, vol]);
    cursor = close;
  }
  return rows;
}

export function HighchartsStockChart({
  symbol,
  basePrice = 617,
  height = 430,
  visibleCandlesCount,
  customOhlcv,
  lightTheme = false,
}: HighchartsStockChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let chartInstance: any = null;
    let isMounted = true;

    (async () => {
      const HighchartsModule = await import("highcharts/highstock");
      const Highcharts: any = HighchartsModule.default || HighchartsModule;

      let rawData: number[][] = [];

      if (customOhlcv && customOhlcv.length > 0) {
        rawData = customOhlcv.map((item: any) => {
          if (Array.isArray(item)) {
            return [
              Number(item[0]),
              Number(item[1]),
              Number(item[2]),
              Number(item[3]),
              Number(item[4]),
              Number(item[5] || 15000000),
            ];
          }
          return [
            Number(item.timestamp),
            Number(item.open),
            Number(item.high),
            Number(item.low),
            Number(item.close),
            Number(item.volume || 15000000),
          ];
        });
      } else {
        try {
          const res = await fetch(
            "https://demo-live-data.highcharts.com/aapl-ohlcv.json"
          );
          if (res.ok) {
            const json = await res.json();
            if (Array.isArray(json) && json.length > 20) {
              const lastClose = json[json.length - 1][4] || 180;
              const scale = basePrice / lastClose;
              rawData = json.slice(-180).map((row: number[]) => [
                row[0],
                Number((row[1] * scale).toFixed(2)),
                Number((row[2] * scale).toFixed(2)),
                Number((row[3] * scale).toFixed(2)),
                Number((row[4] * scale).toFixed(2)),
                row[5],
              ]);
            }
          }
        } catch {
          // Fallback to deterministic OHLCV dataset
        }

        if (rawData.length === 0) {
          rawData = generateDeterministicOhlcv(basePrice, 160);
        }
      }

      if (
        typeof visibleCandlesCount === "number" &&
        visibleCandlesCount > 0 &&
        visibleCandlesCount < rawData.length
      ) {
        rawData = rawData.slice(0, visibleCandlesCount);
      }

      if (!isMounted || !containerRef.current) return;

      const ohlc: [number, number, number, number, number][] = [];
      const volume: [number, number, string][] = [];
      const dataLength = rawData.length;

      for (let i = 0; i < dataLength; i += 1) {
        ohlc.push([
          rawData[i][0], // the date
          rawData[i][1], // open
          rawData[i][2], // high
          rawData[i][3], // low
          rawData[i][4], // close
        ]);

        volume.push([
          rawData[i][0], // the date
          rawData[i][5], // the volume
          rawData[i][1] < rawData[i][4]
            ? "highcharts-point-up"
            : "highcharts-point-down",
        ]);
      }

      const bg = lightTheme ? "#FFFFFF" : "#090909";
      const gridColor = lightTheme
        ? "rgba(0,0,0,0.06)"
        : "rgba(255,255,255,0.05)";
      const labelColor = lightTheme ? "#666666" : "#9CA3AF";
      const accent = lightTheme ? "#FF5722" : "#C98A4A";

      chartInstance = Highcharts.stockChart(containerRef.current, {
        credits: { enabled: false },
        chart: {
          backgroundColor: bg,
          height,
          style: {
            fontFamily: "'JetBrains Mono', monospace",
          },
        },
        lang: {
          accessibility: {
            defaultChartTitle: `${symbol} Stock Price`,
          },
        },
        xAxis: {
          gridLineColor: gridColor,
          lineColor: lightTheme ? "#E0E0E0" : "rgba(201,138,74,0.25)",
          labels: { style: { color: labelColor, fontSize: "10px" } },
          crosshair: {
            className: "highcharts-crosshair-custom",
            color: accent,
            dashStyle: "ShortDash",
          },
        },
        yAxis: [
          {
            title: {
              text: "price (INR ₹)",
              style: { color: labelColor, fontSize: "10px" },
            },
            gridLineColor: gridColor,
            crosshair: {
              snap: false,
              className: "highcharts-crosshair-custom",
              color: accent,
              dashStyle: "ShortDash",
              label: {
                enabled: true,
                format: "{value:.2f}",
                backgroundColor: accent,
                style: { color: "#FFFFFF", fontWeight: "bold" },
              },
            },
            labels: {
              align: "left",
              style: { color: labelColor, fontSize: "10px" },
            },
            height: "70%",
          },
          {
            title: {
              text: "volume",
              style: { color: labelColor, fontSize: "10px" },
            },
            gridLineColor: gridColor,
            crosshair: {
              className: "highcharts-crosshair-custom",
              snap: false,
              color: accent,
              label: {
                enabled: true,
                backgroundColor: "#211C19",
                style: { color: "#F2D7B6" },
              },
            },
            labels: {
              align: "left",
              style: { color: labelColor, fontSize: "9px" },
            },
            top: "70%",
            height: "30%",
            offset: 0,
          },
        ],
        tooltip: {
          split: false,
          shared: true,
          fixed: true,
          backgroundColor: lightTheme
            ? "rgba(255, 255, 255, 0.96)"
            : "rgba(17, 17, 17, 0.95)",
          borderColor: accent,
          style: {
            color: lightTheme ? "#222222" : "#FAF7F5",
            fontSize: "11px",
          },
          useHTML: true,
          formatter: function (this: any): string {
            const pts = this.points || [];
            const candle = pts[0]?.point;
            const volPt = pts[1]?.point;
            if (!candle) return "";
            const isUp = candle.close >= candle.open;
            const clr = isUp ? "#51af7b" : "#ff6e6e";
            const diff = (candle.open - candle.close).toFixed(2);
            const pct = (
              ((candle.open - candle.close) / candle.close) *
              100
            ).toFixed(2);
            const volFormatted =
              volPt?.y >= 1000000
                ? `${(volPt.y / 1000000).toFixed(2)} M`
                : volPt?.y?.toLocaleString("en-IN") || "—";

            return `<div style="font-family:'JetBrains Mono',monospace;line-height:1.5;">
              <span style="font-size:1.3em;font-weight:bold;">${symbol} Stock Price</span><br/>
              O <span style="color:${clr};font-weight:bold">${candle.open}</span>
              H <span style="color:${clr};font-weight:bold">${candle.high}</span>
              L <span style="color:${clr};font-weight:bold">${candle.low}</span>
              C <span style="color:${clr};font-weight:bold">${candle.close} (${diff} / ${pct}%)</span>
              <br/>
              Volume <span style="color:${clr};font-weight:bold">${volFormatted}</span>
            </div>`;
          },
        },
        plotOptions: {
          candlestick: {
            color: "#ff6e6e",
            lineColor: "#ff6e6e",
            upColor: "#51af7b",
            upLineColor: "#51af7b",
             dataGrouping: { enabled: false },
          },
          column: {
            dataGrouping: { enabled: false },
          },
        },
        series: [
          {
            type: "candlestick",
            id: `${symbol.toLowerCase()}-ohlc`,
            name: `${symbol} Stock Price`,
            lastPrice: {
              enabled: true,
              color: accent,
              label: {
                enabled: true,
                align: "left",
                backgroundColor: accent,
                style: { color: "#FFFFFF", fontWeight: "bold" },
              },
            },
            data: ohlc,
          },
          {
            type: "column",
            lastPrice: {
              enabled: true,
              label: {
                enabled: true,
                align: "left",
              },
            },
            keys: ["x", "y", "className"],
            id: `${symbol.toLowerCase()}-volume`,
            name: `${symbol} Volume`,
            data: volume,
            yAxis: 1,
          },
        ],
        rangeSelector: {
          verticalAlign: "bottom",
          selected: 1,
          buttonTheme: {
            fill: lightTheme ? "#F5F5F5" : "#141414",
            stroke: lightTheme ? "#DDDDDD" : "rgba(201,138,74,0.3)",
            "stroke-width": 1,
            r: 0,
            style: {
              color: lightTheme ? "#444444" : "#B9B4B1",
              fontWeight: "bold",
              fontSize: "10px",
            },
            states: {
              hover: {
                fill: lightTheme ? "#EEEEEE" : "#211C19",
                style: { color: lightTheme ? "#000000" : "#FAF7F5" },
              },
              select: {
                fill: accent,
                style: { color: "#FFFFFF", fontWeight: "bold" },
              },
            },
          },
          inputEnabled: false,
        },
        navigator: {
          enabled: false,
        },
        scrollbar: {
          enabled: false,
        },
      });
    })();

    return () => {
      isMounted = false;
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [symbol, basePrice, height, visibleCandlesCount, customOhlcv, lightTheme]);

  return (
    <div
      className={`w-full border p-2 ${
        lightTheme
          ? "border-gray-200 bg-white"
          : "border-[#C98A4A]/25 bg-[#090909]"
      }`}
    >
      <div ref={containerRef} className="w-full" style={{ minHeight: height }} />
    </div>
  );
}
