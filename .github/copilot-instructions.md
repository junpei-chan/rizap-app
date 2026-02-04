# Copilot Instructions for Next.js App Router Project

## このドキュメントについて

- GitHub Copilot や各種 AI ツールが本リポジトリのコンテキストを理解しやすくするためのガイドです。
- 新しい機能を実装する際はここで示す技術選定・設計方針・モジュール構成を前提にしてください。
- 不確かな点がある場合は、リポジトリのファイルを探索し、ユーザーに「こういうことですか?」と確認をするようにしてください。

## 前提条件

- 回答は必ず日本語でしてください。
- コードの変更をする際、変更量が200行を超える可能性が高い場合は、事前に「この指示では変更量が200行を超える可能性がありますが、実行しますか?」とユーザーに確認をとるようにしてください。
- 何か大きい変更を加える場合、まず何をするのか計画を立てた上で、ユーザーに「このような計画で進めようと思います。」と提案してください。この時、ユーザーから計画の修正を求められた場合は計画を修正して、再提案をしてください。

## アプリ概要

Next.js 14+ (App Router) を使用した中規模Webアプリケーションです。
外部のLaravel APIと連携し、クリーンアーキテクチャの原則を意識した保守性の高い設計を採用しています。

## 技術スタック概要

- **言語**: TypeScript 5.x
- **フレームワーク**: Next.js 14+ (App Router)
- **パッケージマネージャー**: npm
- **状態管理**: Zustand + React Query (TanStack Query)
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui
- **フォーム管理**: React Hook Form + Zod (バリデーション)
- **API通信**: Axios + React Query
- **認証**: 独自実装 (JWT Token based)
- **バックエンド**: 外部 Laravel API
- **リンター/フォーマッター**: ESLint + Prettier
- **型チェック**: TypeScript (デフォルト設定)

## プロジェクト構成と役割

クリーンアーキテクチャを意識した機能ベースのディレクトリ構成を採用しています。

```
src/
├── app/                          # Next.js App Router
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── layout.tsx               # ルートレイアウト
│   └── page.tsx                 # トップページ
├── components/                   # UI コンポーネント専用
│   ├── features/                # 機能別コンポーネント
│   │   ├── auth/                # 認証関連コンポーネント
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   └── index.ts
│   │   └── [feature-name]/      # その他の機能別コンポーネント
│   └── shared/                  # 共通コンポーネント
│       ├── ui/                  # shadcn/ui コンポーネント
│       ├── layout/              # レイアウトコンポーネント
│       └── feedback/            # フィードバック (Toast, Modal等)
├── hooks/                        # カスタムフック
│   ├── features/                # 機能別フック
│   │   ├── auth/                # 認証関連フック
│   │   │   ├── use-auth.ts
│   │   │   ├── use-login.ts
│   │   │   └── index.ts
│   │   └── [feature-name]/      # その他の機能別フック
│   └── shared/                  # 共通フック
│       └── use-debounce.ts
├── stores/                       # Zustand 状態管理
│   ├── auth-store.ts             # 認証ストア
│   └── [feature-name]-store.ts   # その他の機能別ストア
├── services/                     # API サービス層
│   ├── auth/                    # 認証API
│   │   ├── auth-service.ts
│   │   └── index.ts
│   ├── user/                    # ユーザーAPI
│   │   ├── user-service.ts
│   │   └── index.ts
│   └── [feature-name]/          # その他の機能別API
├── lib/                          # ライブラリ設定・ユーティリティ
│   ├── axios/                   # Axios インスタンス設定
│   │   ├── client.ts
│   │   └── index.ts
│   ├── react-query/             # React Query 設定
│   │   ├── query-client.ts
│   │   └── index.ts
│   ├── utils/                   # ユーティリティ関数
│   │   ├── cn.ts                # クラス名結合
│   │   ├── format-date.ts
│   │   └── index.ts
│   └── constants/               # 定数定義
│       ├── routes.ts
│       └── index.ts
├── types/                        # 型定義
│   ├── auth.types.ts            # 認証関連の型
│   ├── user.types.ts            # ユーザー関連の型
│   ├── api.types.ts             # API共通の型
│   └── [feature-name].types.ts  # 機能別の型定義
```

## アーキテクチャ指針

### クリーンアーキテクチャの適用

本プロジェクトでは、以下の層分離を意識します:

1. **プレゼンテーション層** (`app/`, `components/`)
  - UI コンポーネント、ページコンポーネント
  - ユーザーインタラクションの処理

2. **アプリケーション層** (`hooks/`, `services/`)
  - ビジネスロジック、カスタムフック
  - API 呼び出しのオーケストレーション

3. **ドメイン層** (`types/`, `stores/`)
  - ドメインモデル、型定義
  - 状態管理

4. **インフラ層** (`lib/`)
  - 外部ライブラリのラッパー
  - API クライアント設定
  - ユーティリティ関数

### 依存性の方向

- 外側の層から内側の層への依存のみ許可
- 内側の層は外側の層に依存しない
- `lib/` と `types/` は全ての層から参照可能
- `components/shared/` は全ての機能から参照可能だが、`components/features/` への依存は禁止
- `hooks/shared/` と `services/` は機能横断的に使用可能
- 機能別モジュール (`components/features/*`, `hooks/features/*`) 間の相互依存は避ける

## コンポーネント設計

### Server Components と Client Components の使い分け

- **デフォルトは Server Components**: データフェッチ、静的コンテンツ
- **Client Components**: インタラクティブな UI、状態管理、ブラウザAPI使用時
- **'use client' ディレクティブ**: 必要最小限のコンポーネントにのみ付与

### コンポーネント設計原則

- **Single Responsibility**: 1つのコンポーネントは1つの責務のみ
- **Props の型定義**: 全ての props に明示的な型を定義
- **Named Export**: デフォルトエクスポートは避ける
- **Composition Pattern**: 小さなコンポーネントを組み合わせて複雑な UI を構築

## ディレクトリ・ファイル命名規則

### App Router 関連

- **page.tsx**: ルートページコンポーネント
- **layout.tsx**: レイアウトコンポーネント
- **loading.tsx**: ローディング UI
- **error.tsx**: エラー UI

### コンポーネント

- **ファイル名**: ケバブケース (例: `user-profile.tsx`, `task-card.tsx`)
- **ディレクトリ**: ケバブケース (例: `user-profile/`, `task-card/`)
- **関数名**: PascalCase (例: `UserProfile()`, `TaskCard()`)
- **index.ts**: 各ディレクトリに配置し、外部へのエクスポートを集約

### フック

- **ファイル名**: ケバブケース + `use` プレフィックス (例: `use-auth.ts`, `use-user-data.ts`)
- **関数名**: camelCase + `use` プレフィックス (例: `useAuth()`)

### 型定義

- **ファイル名**: camelCase (例: `user.types.ts`, `api.types.ts`)
- **型名**: PascalCase (例: `User`, `ApiResponse<T>`)

## 状態管理の実装ガイド

### Zustand の使い方

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        setAuth: (user, token) => 
          set({ user, token, isAuthenticated: true }),
        clearAuth: () => 
          set({ user: null, token: null, isAuthenticated: false }),
      }),
      { name: 'auth-storage' }
    )
  )
);
```

### React Query の使い方

```typescript
// hooks/features/user/useUser.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';
import type { User } from '@/types/user.types';

// Query
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/users/${userId}`);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5分
  });
};

// Mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: Partial<User>) => {
      const { data } = await apiClient.put<User>('/users/me', userData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
    },
  });
};
```

## API 通信とデータ管理

### Axios インスタンスの設定

```typescript
// lib/axios/client.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター (トークン付与)
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// レスポンスインターセプター (エラーハンドリング)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### データ型定義とバリデーション

```typescript
// Zod スキーマで定義し、TypeScript 型を生成
// types/user.types.ts
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;
```

## 認証実装 (独自実装)

### ログイン処理の例

```typescript
// hooks/features/auth/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';
import { useAuthStore } from '@/stores/authStore';
import Cookies from 'js-cookie';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await apiClient.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      Cookies.set('auth-token', data.token, { expires: 7 });
      setAuth(data.user, data.token);
    },
  });
};
```

## スタイリング (Tailwind CSS + shadcn/ui)

### Tailwind CSS の設定

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // shadcn/ui のテーマ設定
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### shadcn/ui コンポーネントの使用

- `npx shadcn-ui@latest add button` でコンポーネントを追加
- `src/components/shared/ui/` に配置される
- 必要に応じてカスタマイズ可能

## パフォーマンス最適化

### Next.js App Router の最適化

- **Dynamic Import**: 重いコンポーネントは動的インポート
- **Image Optimization**: `next/image` を使用
- **Font Optimization**: `next/font` を使用
- **Metadata API**: SEO 最適化

```typescript
// app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ホーム | アプリ名',
  description: 'アプリの説明',
};
```

### React の最適化

- **React.memo**: 不要な再レンダリングを防ぐ
- **useMemo / useCallback**: 高コストな計算や関数の再生成を防ぐ
- **Suspense**: データフェッチ中のローディング UI

## アンチパターン

以下のパターンは避けてください:

### Next.js App Router 関連

- **Client Components の過度な使用**: Server Components でできることは Server で
- **不適切な 'use client' の位置**: できるだけ葉のコンポーネントに配置
- **Route Handler の濫用**: 外部 API があるので必要最小限に

### 状態管理

- **過度なグローバル状態**: 真にグローバルな状態のみを Zustand で管理
- **React Query と Zustand の混在**: サーバー状態は React Query、クライアント状態は Zustand

### API 通信

- **fetch の直接使用**: 必ず Axios インスタンスを使用
- **エラーハンドリング不足**: try-catch またはインターセプターで必ず処理

## 環境変数管理

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=MyApp
```

- `NEXT_PUBLIC_` プレフィックス: クライアント側で使用可能
- プレフィックスなし: サーバー側のみで使用可能

## まとめ

このドキュメントは、Next.js App Router を使用した中規模プロジェクトにおける開発ガイドラインです。クリーンアーキテクチャの原則を意識しながら、Next.js の機能を最大限活用し、保守性の高いコードベースを維持してください。

チーム全体でこのガイドラインに従うことで、コードの一貫性が向上し、新しいメンバーのオンボーディングも円滑になります。

---

**Next.js App Router + Clean Architecture** で、スケーラブルで保守性の高いアプリケーションを構築しましょう。