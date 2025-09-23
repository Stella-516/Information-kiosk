import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { artworks as artworksData } from "../data/artworksData";

const DEFAULT_AVATAR = "/assets/avatars/A(1).png";

function slugify(str = "") {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function buildAvatarCandidates(a) {
  const direct = a.artistAvatar || a.artistPhoto || a.photo || a.avatar || null;

  const baseKey =
    a.artistId ||
    (a.artistName && slugify(a.artistName)) ||
    (a.name && slugify(a.name)) ||
    null;

  const fromAssets = baseKey
    ? [
        `/assets/avatars/${baseKey}.png`,
        `/assets/avatars/${baseKey}.jpg`,
        `/assets/avatars/${baseKey}.jpeg`,
        `/assets/avatars/${baseKey}.webp`,
      ]
    : [];

  const list = [];
  if (direct) list.push(direct);
  list.push(...fromAssets);
  list.push(DEFAULT_AVATAR);
  return list;
}

function AvatarImage({ candidates, alt, className, style }) {
  const [idx, setIdx] = useState(0);
  const src = candidates[idx] || DEFAULT_AVATAR;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (idx < candidates.length - 1) setIdx(idx + 1);
      }}
    />
  );
}

export default function ArtistIntroList() {
  const nav = useNavigate();

  const items = useMemo(() => {
    const rows = Array.isArray(artworksData) ? artworksData : [];

    const artistMap = new Map();

    rows.forEach((a, i) => {
      const artistName =
        a?.artistName ??
        a?.name ??
        a?.artist ??
        a?.author ??
        a?.writer ??
        "작가 미상";

      const title =
        a?.title?.ko ??
        a?.title ??
        a?.workTitle ??
        a?.nameKo ??
        a?.nameEn ??
        "Untitled";

      const org = a?.org || "소속 기관 없음";

      const artistKey = `${artistName}-${org}`;

      if (!artistMap.has(artistKey)) {
        artistMap.set(artistKey, {
          id: `${slugify(artistName)}-${slugify(org)}`,
          artistName,
          title,
          org,
          avatarCandidates: buildAvatarCandidates({
            ...a,
            artistName,
          }),
          worksCount: 1,
          allTitles: [title],
        });
      } else {
        const existing = artistMap.get(artistKey);
        existing.worksCount++;
        existing.allTitles.push(title);
      }
    });

    return Array.from(artistMap.values());
  }, []);

  return (
    <div
      className="a-intro-wrap"
      style={{
        minHeight: "100vh",
        background: "#efeff3",
        color: "#111",
        overflowX: "hidden",
        overflowY: "auto",
        padding: "40px 20px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
            margin: "0 0 10px 0",
          }}
        >
          작가분들 모아보기
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#666",
            margin: "0",
          }}
        >
          참여 작가들의 프로필을 확인해보세요!
        </p>
      </div>

      <div
        className="a-intro-grid"
        role="list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px",
          maxWidth: "100%",
          margin: "0 auto",
          padding: "0 20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {items.map((it) => (
          <div
            key={it.id}
            className="a-card"
            role="listitem"
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              border: "none",
              borderRadius: "20px",
              padding: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,.08)",
              minHeight: "280px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,.08)";
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <AvatarImage
                candidates={it.avatarCandidates}
                alt={`${it.artistName} 사진`}
                className="a-card__avatar"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                  border: "4px solid #fff",
                }}
              />
            </div>

            <div
              className="a-card__artist"
              title={it.artistName}
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "8px",
                color: "#2c3e50",
                lineHeight: 1.3,
              }}
            >
              {it.artistName}
            </div>

            <div
              className="a-card__org"
              style={{
                fontSize: "12px",
                fontWeight: "600",
                textAlign: "center",
                color: "#7f8c8d",
                lineHeight: 1.4,
                marginBottom: "10px",
                padding: "6px 8px",
                background: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              {it.org}
            </div>

            <div
              className="a-card__title"
              title={
                it.worksCount > 1
                  ? `${it.title} 외 ${it.worksCount - 1}개 작품`
                  : it.title
              }
              style={{
                fontSize: "12px",
                fontWeight: "500",
                textAlign: "center",
                color: "#95a5a6",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "32px",
                padding: "0 4px",
              }}
            >
              {it.title}
              {it.worksCount > 1 && (
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                    color: "#666",
                    marginTop: "2px",
                  }}
                >
                  외 {it.worksCount - 1}개 작품
                </div>
              )}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div
            className="a-card"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              border: "1px solid #efefef",
              borderRadius: "16px",
              padding: "16px",
              height: "200px",
              gridColumn: "1 / -1",
            }}
          >
            표시할 카드가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
