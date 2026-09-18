import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Bhavpreet Singh Arneja — Cloud and AI infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OG_DIR = join(process.cwd(), "app/og-fonts");

export default async function Image() {
  const [spaceGroteskBold, interRegular, interMedium, interSemiBold, portrait] =
    await Promise.all([
      readFile(join(OG_DIR, "SpaceGrotesk-Bold.ttf")),
      readFile(join(OG_DIR, "Inter-Regular.ttf")),
      readFile(join(OG_DIR, "Inter-Medium.ttf")),
      readFile(join(OG_DIR, "Inter-SemiBold.ttf")),
      readFile(join(process.cwd(), "public/bhavpreet-portrait-feathered.png")),
    ]);

  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #ffffff 0%, #eef2f7 60%)",
          fontFamily: "Inter",
        }}
      >
        {/* Ambient colour, the same cool-neutral + tangerine-note recipe
            as the site's Atmosphere layer, softened into two radial
            blooms since there is no live blur pass here. */}
        <div
          style={{
            position: "absolute",
            width: 780,
            height: 780,
            left: -220,
            top: -260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(140,166,198,0.55) 0%, rgba(140,166,198,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            right: -160,
            bottom: -220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,107,53,0.28) 0%, rgba(255,107,53,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            right: 260,
            top: -180,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(61,90,254,0.22) 0%, rgba(61,90,254,0) 70%)",
          }}
        />

        {/* Content pane, styled like the site's frosted `.glass` panels
            without a live backdrop-filter (there is nothing behind an
            exported PNG to blur), so the surface is opaque instead. */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 48,
            left: 48,
            right: 48,
            bottom: 48,
            borderRadius: 32,
            background: "rgba(255,255,255,0.72)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
            border: "1px solid rgba(16,17,20,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              padding: "0 64px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(16,17,20,0.04)",
                border: "1px solid rgba(16,17,20,0.09)",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#3d5afe",
                }}
              />
              <div
                style={{
                  fontSize: 15,
                  fontFamily: "Inter",
                  fontWeight: 500,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#475569",
                }}
              >
                Open to new-grad roles
              </div>
            </div>

            <div
              style={{
                fontSize: 68,
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                letterSpacing: -2,
                lineHeight: 1.04,
                color: "#101114",
              }}
            >
              Bhavpreet Singh
            </div>
            <div
              style={{
                fontSize: 68,
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                letterSpacing: -2,
                lineHeight: 1.04,
                color: "#101114",
                marginBottom: 26,
              }}
            >
              Arneja
            </div>

            <div
              style={{
                display: "flex",
                width: 84,
                height: 5,
                borderRadius: 999,
                background:
                  "linear-gradient(90deg, #2b46e0, #8a3fe0 50%, #e0551f)",
                marginBottom: 26,
              }}
            />

            <div
              style={{
                fontSize: 26,
                fontFamily: "Inter",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "#475569",
                maxWidth: 620,
              }}
            >
              Cloud and AI infrastructure. Fourth-year CS Co-op building
              Azure automation and ML systems that ship.
            </div>

            <div
              style={{
                display: "flex",
                gap: 28,
                marginTop: 40,
                paddingTop: 24,
                borderTop: "1px solid rgba(16,17,20,0.1)",
                fontSize: 18,
                fontFamily: "Inter",
                fontWeight: 500,
                color: "#475569",
              }}
            >
              <div style={{ display: "flex" }}>3 co-op terms</div>
              <div style={{ display: "flex" }}>Azure · Python · Next.js</div>
              <div style={{ display: "flex" }}>Nova Scotia, Canada</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 360,
              paddingRight: 56,
            }}
          >
            <img
              src={portraitSrc}
              alt=""
              width={320}
              height={320}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 30px 60px -20px rgba(16,24,40,0.35)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: spaceGroteskBold, weight: 700, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
      ],
    }
  );
}
