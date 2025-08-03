# 🚀 Issue Tracker

> GitHub Issues에서 영감을 받은 이슈 관리 웹 애플리케이션
> 
> OAuth 로그인, 필터링/라벨/마일스톤/이슈 상태관리, CI/CD, 성능 최적화 구현
> 
> 공통 컴포넌트 설계
> 
> 디자인시스템 설계

---

## 📌 한눈에 보기

| 항목 | 내용 |
|------|------|
| 개발 기간 | 2025.06 (4주) |
| 주요 기술 | React, TypeScript, Vite, React-Query, Emotion, Zustand |
| 배포 방식 | GitHub Actions + AWS S3 + CloudFront |
| 협업 방식 | GitHub Projects 기반 이슈/PR 관리 |
| 주요 구현 | OAuth 로그인, 이슈 필터링, 라벨/마일스톤 관리 |
| 최적화 | Lazy Loading, manualChunks, Gzip 기준 **~41% 감소** |

---

## 🤝 기여도 요약

- 총 **이슈 생성**: 74건  
- 총 **PR 생성**: 60건 (병합 완료: 58, 미병합: 2)  
- 이슈 및 PR 기반의 **체계적인 협업과 커밋 관리**  
- PR마다 **작업 배경, 구현 방식, 스크린샷**까지 상세히 기록  
- 🔗 [PR 모음 보기](https://github.com/codesquad-masters2025-team02/issue-tracker/pulls?q=is%3Apr+author%3Awan0514)

---

## 💻 주요 기능

  * [x] GitHub OAuth 로그인 (REST API 기반 인증 연동)
  * [x] 이슈 목록 조회 / 필터링 (상태별, 작성자, 라벨, 마일스톤 등)
  * [x] 이슈 생성 / 조회 / 편집 / 삭제
  * [x] 이슈 Open / Close 상태 전환
  * [x] 마엘스톤 및 라벨 설정 / 선택

---
## ⚒️ 주요 문제 해결 및 기술적 도전

### 🛠️ **1. 클라이언트 라우팅 이슈 대응 (SPA)**

- **문제**: S3 정적 호스팅 환경에서 직접 경로 접근 시 404 발생
- **해결**: `CloudFront Function`으로 모든 요청 경로를 검사하고 확장자 없는 경로를 `index.html`로 rewrite  
- 🔗 [문제 해결 상세 보기](https://www.notion.so/wan0514/cloudfront-routing)

---

### 🛠️ **2. 번들 크기 이슈 분석 및 성능 최적화**

- **원인 분석**: `rollup-plugin-visualizer`를 통해 번들 내 모듈 구조를 시각화 (`stats.html`)  
- **주요 개선 작업**:
  - 페이지 컴포넌트 `lazy()` 로딩 및 `withSuspense` HOC 적용
  - 개발 전용 도구 (e.g. ReactQueryDevtools) 조건부 번들링
  - `vite.config.ts`에서 `manualChunks`로 vendor 청크 분리
  - 사용하지 않는 mock JSON은 `public` 밖으로 이동해 번들 제외
- **결과**: 렌더링 기준 번들 크기 **1.46MB → 856KB**, 약 **41.4% 감소**
- 🔗 [최적화 상세 보기 + 시각화 비교 자료](https://www.notion.so/24402717a6478009a54aebed97cdf4dc)

---

### 🛠️ **3. CI/CD 파이프라인 구축**

- `GitHub Actions`를 활용하여 2단계 CI/CD 파이프라인을 구축했습니다.
- `fe` 브랜치에 푸시하면 CI(테스트) job만, `dev` 브랜치에 푸시하면 테스트 성공 후 `cd` job이 실행되어 AWS S3와 CloudFront로 자동 배포됩니다.
- `actions/upload-artifact`와 `actions/download-artifact`를 활용해 빌드 결과물을 전달하여 **불필요한 재빌드를 방지**했습니다.
- AWS 자격 증명(`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)은 **GitHub Secrets에 등록하여 보안성을 확보**했습니다.
- 배포 완료 후에는 `CloudFront`의 캐시 무효화(Invalidation)를 자동으로 실행해 **최신 콘텐츠가 즉시 반영**되도록 구성했습니다.
- 🔗 [깃허브 액션 워크플로우 보기](https://github.com/wan0514/issue-tracker/blob/dev/.github/workflows/frontend-ci.yml)

---

### 🛠️ 4. 디자인 시스템 기반의 공통 컴포넌트 설계
- 재사용성과 일관성 향상을 위해 핵심 UI 요소를 공통 컴포넌트로 분리 설계
- Button, Dropdown, Profile, Badge 등은 상태, 사이즈, 변형 타입을 prop으로 제어 가능하게 구현
- 추상화 수준을 조절하여 유지보수성과 확장성을 모두 고려함
- 🔗 [드롭다운 컴포넌트 설계 및 구현기](https://github.com/wan0514/issue-tracker/blob/dev/.github/workflows/frontend-ci.yml)
