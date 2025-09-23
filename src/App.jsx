// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Guide from "./pages/Guide";
import Menu from "./pages/Menu";
import LowScreenMenu from "./pages/LowScreenMenu";
import HighContrastMenu from "./pages/HighContrastMenu";
import MenuInfo from "./pages/MenuInfo";
import MunuQR from "./pages/MunuQR";

import ArtworkList from "./pages/ArtworkList";
import LowScreenArtworkList from "./pages/LowScreenArtworkList";
import HighContrastQR from "./pages/HighContrastQR";
import HighContrastInfo from "./pages/HighContrastInfo";
import HighContrastArtistIntroList from "./pages/HighContrastArtistIntroList";
import HighContrastArtworkList from "./pages/HighContrastArtworkList";
import HighContrastArtworkViewer from "./pages/HighContrastArtworkViewer";
import ArtworkViewer from "./pages/ArtworkViewer";

import FeedbackLayout from "./pages/FeedbackLayout";
import FeedbackHome from "./pages/FeedbackHome";
import FeedbackEmotion from "./pages/FeedbackEmotion";
import FeedbackWrite from "./pages/FeedbackWrite";
import FeedbackMessage from "./pages/FeedbackMessage";
import FeedbackDone from "./pages/FeedbackDone";
import HighContrastFeedbackHome from "./pages/HighContrastFeedbackHome";
import HighContrastFeedbackEmotion from "./pages/HighContrastFeedbackEmotion";
import HighContrastFeedbackWrite from "./pages/HighContrastFeedbackWrite";
import HighContrastFeedbackMessage from "./pages/HighContrastFeedbackMessage";
import HighContrastFeedbackDone from "./pages/HighContrastFeedbackDone";

// ✅ 작가 소개 페이지 임포트 (경로/철자 꼭 확인)
import ArtistIntroList from "./pages/ArtistIntroList";

function AppShell() {
  const { pathname } = useLocation();
  // 랜딩(/)과 guide 계열에서는 하단바 숨김, 그 외 페이지에서는 표시
  const showFooter = !(pathname === "/" || pathname.startsWith("/guide"));

  return (
    <>
      <Header />
      <div style={{ 
        paddingTop: 68, 
        paddingBottom: showFooter ? 72 : 0
      }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/guide" element={<Guide />} />

          {/* guide 임시 */}
          <Route
            path="/guide/intro"
            element={
              <div style={{ color: "#000" }}>전시 소개 페이지 (임시)</div>
            }
          />
          <Route
            path="/guide/works"
            element={
              <div style={{ color: "#000" }}>작품 보기 페이지 (임시)</div>
            }
          />
          <Route
            path="/guide/map"
            element={
              <div style={{ color: "#000" }}>오시는 길 페이지 (임시)</div>
            }
          />

          {/* 이전 경로 리다이렉트 */}
          <Route
            path="/menu/works"
            element={<Navigate to="/works" replace />}
          />
          <Route
            path="/menu/artist"
            element={<Navigate to="/works" replace />}
          />

          {/* 작품 */}
          <Route path="/works" element={<ArtworkList />} />
          <Route path="/works/viewer" element={<ArtworkViewer />} />
          <Route path="/low-screen/works" element={<LowScreenArtworkList />} />
          <Route path="/low-screen/works/viewer" element={<ArtworkViewer />} />
          <Route path="/high-contrast/works" element={<HighContrastArtworkList />} />
          <Route path="/high-contrast/works/viewer" element={<HighContrastArtworkViewer />} />
          <Route path="/artworks" element={<Navigate to="/works" replace />} />
          <Route
            path="/artworks/viewer"
            element={<Navigate to="/works/viewer" replace />}
          />

          {/* 메뉴 */}
          <Route path="/menu" element={<Menu />} />
          
          {/* 낮은 화면 위치 도움 서비스 메뉴 */}
          <Route path="/low-screen" element={<LowScreenMenu />} />
          
          {/* 큰 글씨/고대비 도움 서비스 메뉴 */}
          <Route path="/high-contrast" element={<HighContrastMenu />} />

          {/* ✅ 전시회 안내정보 페이지 */}
          <Route path="/menu/info" element={<MenuInfo />} />
          <Route path="/low-screen/info" element={<MenuInfo />} />
          <Route path="/high-contrast/info" element={<HighContrastInfo />} />

          {/* ✅ 전체 작품 설명 QR 페이지 */}
          <Route path="/menu/qr" element={<MunuQR />} />
          <Route path="/low-screen/qr" element={<MunuQR />} />
          <Route path="/high-contrast/qr" element={<HighContrastQR />} />

          {/* ✅ 작가 소개 페이지 - 직접 접근 가능 */}
          <Route path="/menu/artist-intro" element={<ArtistIntroList />} />
          <Route path="/low-screen/artist-intro" element={<ArtistIntroList />} />
          <Route path="/high-contrast/artist-intro" element={<HighContrastArtistIntroList />} />

          {/* ✅ /menu/feedback 레이아웃 + 자식 라우트들 */}
          <Route path="/menu/feedback" element={<FeedbackLayout />}>
            <Route index element={<FeedbackHome />} />
            <Route path="emotion" element={<FeedbackEmotion />} />
            <Route path="write" element={<FeedbackWrite />} />
            <Route path="message" element={<FeedbackMessage />} />
            <Route path="done" element={<FeedbackDone />} />

            {/* ✅ 여기! 자식 라우트로 추가 (절대경로 금지) */}
            <Route path="artist-intro" element={<ArtistIntroList />} />
          </Route>

          {/* ✅ /low-screen/feedback 레이아웃 + 자식 라우트들 */}
          <Route path="/low-screen/feedback" element={<FeedbackLayout />}>
            <Route index element={<FeedbackHome />} />
            <Route path="emotion" element={<FeedbackEmotion />} />
            <Route path="write" element={<FeedbackWrite />} />
            <Route path="message" element={<FeedbackMessage />} />
            <Route path="done" element={<FeedbackDone />} />

            {/* ✅ 여기! 자식 라우트로 추가 (절대경로 금지) */}
            <Route path="artist-intro" element={<ArtistIntroList />} />
          </Route>

          {/* ✅ /high-contrast/feedback 레이아웃 + 자식 라우트들 */}
          <Route path="/high-contrast/feedback" element={<FeedbackLayout />}>
            <Route index element={<HighContrastFeedbackHome />} />
            <Route path="emotion" element={<HighContrastFeedbackEmotion />} />
            <Route path="write" element={<HighContrastFeedbackWrite />} />
            <Route path="message" element={<HighContrastFeedbackMessage />} />
            <Route path="done" element={<HighContrastFeedbackDone />} />

            {/* ✅ 여기! 자식 라우트로 추가 (절대경로 금지) */}
            <Route path="artist-intro" element={<HighContrastArtistIntroList />} />
          </Route>


          {/* (선택) 404 핸들링 */}
          <Route
            path="*"
            element={
              <div style={{ color: "#000", padding: 24 }}>
                페이지를 찾을 수 없어요.
              </div>
            }
          />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
