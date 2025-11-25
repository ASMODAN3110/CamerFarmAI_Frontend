# BOBO - Conventions React en Français

Ce document compile toutes les conventions et bonnes pratiques pour le développement React dans notre organisation.

---

## Table des matières

1. [Structure de projet](#structure-de-projet)
2. [Architecture des composants](#architecture-des-composants)
3. [Gestion d'état](#gestion-détat)
4. [Styles](#styles)
5. [Tests](#tests)
6. [Bonnes pratiques](#bonnes-pratiques)

---

## Structure de projet

Nous alignons l'arborescence sur l'approche component-driven de React afin que les blocs réutilisables (header, footer, boutons, sections répétées) restent centralisés et faciles à maintenir.

### Arborescence type

```
src/
├── app/ ou pages/         # Points d'entrée par route (Next.js, Remix) ou coquilles de pages
├── components/            # Blocs réutilisables axés présentation
│   ├── layout/            # `Header`, `Footer`, navigation, métadonnées SEO
│   ├── ui/                # Boutons, cartes, champs de formulaire, icônes
│   └── blocks/            # Sections de page récurrentes (hero, grille de fonctionnalités)
├── features/              # Flows produit autonomes mêlant UI + logique
├── hooks/                 # Hooks personnalisés (useAuth, useFeatureFlags)
├── services/              # Clients API, accès données, wrappers SDK
├── styles/                # Styles globaux, tokens, thème
├── tests/                 # Mocks partagés, tests d'intégration
└── utils/                 # Helpers purs sans import React
```

### Règles de nommage

- **Composants** en `PascalCase` : `Header.tsx`, `PricingCard.tsx`.
- **Hooks** commencent par `use` : `useSessionTimeout.ts`.
- **Composants partagés** (boutons, blocs) rangés dans des sous-dossiers reflétant leur rôle : `components/ui/Button/PrimaryButton.tsx`.
- **Tests** idéalement co-localisés (`ComponentName.test.tsx`), sinon dans `tests/`.

### Conventions layout

- Chaque page importe un composant `Header` et `Footer` depuis `components/layout/`. Ils portent navigation, branding, SEO et providers globaux (`<ThemeProvider>`…).
- Les sections répétées (hero, FAQ, KPI, témoignages) vivent dans `components/blocks/` et s'exposent via des props (`items`, `ctaLabel`, `alignment`) pour rester personnalisables.
- Boutons, liens et contrôles de formulaire proviennent de `components/ui/` et exposent une API standard (`variant`, `size`, `asChild`).

#### Exemple : Structure de page

```tsx
// src/app/home/HomePage.tsx
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { FeatureGrid } from '@/components/blocks/FeatureGrid';
import { Button } from '@/components/ui/Button';

export function HomePage() {
  return (
    <>
      <Header 
        navItems={[
          { label: 'Accueil', href: '/' },
          { label: 'À propos', href: '/about' }
        ]}
      />
      <main>
        <HeroBlock 
          heading="Bienvenue"
          ctaLabel="Commencer"
          ctaHref="/signup"
        />
        <FeatureGrid 
          items={features}
          columns={3}
        />
      </main>
      <Footer 
        copyright="© 2024 Entreprise"
        links={footerLinks}
      />
    </>
  );
}
```

#### Exemple : Point d'entrée

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AppRouter } from './AppRouter';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </StrictMode>
);
```

### Modules feature

- Grouper écrans, hooks, reducers et services propres à une fonctionnalité dans `features/<nom-feature>/`.
- Exporter via `features/<nom>/index.ts` pour simplifier les imports.
- Migrer un composant vers `components/` seulement lorsqu'il devient générique.

#### Exemple : Structure de feature

```
features/
└── auth/
    ├── components/
    │   ├── LoginForm.tsx
    │   └── SignupForm.tsx
    ├── hooks/
    │   ├── useAuth.ts
    │   └── useLogin.ts
    ├── services/
    │   └── authService.ts
    └── index.ts          # Exports: LoginForm, SignupForm, useAuth
```

```tsx
// features/auth/index.ts
export { LoginForm } from './components/LoginForm';
export { SignupForm } from './components/SignupForm';
export { useAuth } from './hooks/useAuth';

// Utilisation dans l'app:
import { LoginForm, useAuth } from '@/features/auth';
```

### Points d'entrée

- `src/main.tsx` (Vite) ou `src/index.tsx` (CRA) ne servent qu'à monter les providers et router principal.
- Centraliser la définition des routes dans un `AppRouter`; les features fournissent des pages mais ne modifient pas la configuration globale.

### Environnement & config

- Regrouper la configuration runtime dans `src/config/` (`env.ts`, feature flags). Lire les variables d'environnement une seule fois puis exposer des helpers typés.
- Documenter toutes les variables requis dans le README du projet.

#### Exemple : Configuration

```tsx
// src/config/env.ts
interface EnvConfig {
  apiUrl: string;
  enableAnalytics: boolean;
  featureFlags: {
    newCheckout: boolean;
  };
}

export const config: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.example.com',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  featureFlags: {
    newCheckout: import.meta.env.VITE_FEATURE_NEW_CHECKOUT === 'true',
  },
};

// Utilisation:
import { config } from '@/config/env';
fetch(`${config.apiUrl}/users`);
```

---

## Architecture des composants

Les pages React doivent être une composition de petits composants autonomes, réutilisables et faciles à tester.

### Principes

- **Composition > héritage** : assembler des primitives (`Layout`, `Stack`, `Button`) plutôt que de créer de gros composants monolithiques.
- **Responsabilité unique** : un composant gère soit la présentation, soit l'orchestration, soit la logique de données, jamais tout en même temps.
- **Contrats explicites** : typer tous les props avec TypeScript, bannir `any`.
- **UI stateless par défaut** : déplacer l'état dans un hook ou un conteneur proche et passer les données par props.

### Composants de layout

- `Header`, `Footer` et tout chrome persistant vivent dans `components/layout/`.
- Ils hébergent les providers globaux (thème, i18n) et les hooks de navigation mais déléguent la logique métier aux features.
- Les props doivent permettre la configuration (items de navigation, CTA, langue active, switcher).

#### Exemple : Composant Header

```tsx
// components/layout/Header.tsx
import { Button } from '@/components/ui/Button';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems: NavItem[];
  cta?: { label: string; href: string };
  showLanguageSwitcher?: boolean;
  locale?: string;
}

export function Header({ 
  navItems, 
  cta, 
  showLanguageSwitcher = false,
  locale = 'fr' 
}: HeaderProps) {
  return (
    <header className="header">
      <nav className="header__nav" aria-label="Navigation principale">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      {cta && (
        <Button variant="primary" href={cta.href}>
          {cta.label}
        </Button>
      )}
      {showLanguageSwitcher && <LanguageSwitcher currentLocale={locale} />}
    </header>
  );
}
```

### Blocs réutilisables

- Toute section récurrente (hero, grilles de fonctionnalités, témoignages) est placée dans `components/blocks/`.
- Les blocs exposent des props pour rester personnalisables (`alignment`, `mediaPosition`, `badgeLabel`, `items`).
- Si un bloc nécessite une requête, effectuer l'appel dans un parent/Hook puis fournir les données au bloc afin qu'il reste pur.

#### Exemple : Bloc Hero

```tsx
// components/blocks/HeroBlock.tsx
import { Button } from '@/components/ui/Button';

interface HeroBlockProps {
  heading: string;
  subheading?: string;
  ctaLabel: string;
  ctaHref: string;
  alignment?: 'left' | 'center' | 'right';
  backgroundImage?: string;
}

export function HeroBlock({
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  alignment = 'center',
  backgroundImage,
}: HeroBlockProps) {
  return (
    <section 
      className={`hero hero--${alignment}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <h1>{heading}</h1>
      {subheading && <p>{subheading}</p>}
      <Button variant="primary" href={ctaHref}>
        {ctaLabel}
      </Button>
    </section>
  );
}

// Utilisation:
<HeroBlock 
  heading="Construisez plus vite"
  subheading="Livrez des apps de qualité en un temps record"
  ctaLabel="Commencer"
  ctaHref="/signup"
  alignment="center"
/>
```

### UI Elements (boutons, inputs, etc.)

- Implémenter les boutons une seule fois dans `components/ui/Button/` avec des variantes (`variant`, `size`, `asChild`).
- Gérer les états focus/hover/disabled et ajouter par défaut `type="button"` hors formulaires de soumission.
- Partager tokens (couleurs, espaces, polices) via un thème central pour garder header, footer, blocs et boutons alignés.

#### Exemple : Composant Button

```tsx
// components/ui/Button/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, href, ...props }, ref) => {
    const classes = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      className,
    ].filter(Boolean).join(' ');

    if (href) {
      return (
        <a href={href} className={classes} role="button">
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Utilisation:
<Button variant="primary" size="lg">Soumettre</Button>
<Button variant="secondary" href="/about">En savoir plus</Button>
<Button variant="ghost" size="sm" disabled>Annuler</Button>
```

### Hooks & conteneurs

- Les hooks (`useHeroContent`, `useFetchProjects`) encapsulent side effects et accès données.
- Les conteneurs (souvent sous `features/`) connectent hooks + composants de présentation, gèrent les loaders et callbacks.
- Éviter `fetch` ou mutations globales dans les composants de présentation.

#### Exemple : Hook personnalisé

```tsx
// hooks/useFetchProjects.ts
import { useState, useEffect } from 'react';
import { projectService } from '@/services/projectService';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'archived';
}

export function useFetchProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    projectService
      .getAll()
      .then(setProjects)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
}

// Composant conteneur:
// features/projects/ProjectsContainer.tsx
import { useFetchProjects } from '@/hooks/useFetchProjects';
import { ProjectList } from './components/ProjectList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function ProjectsContainer() {
  const { projects, loading, error } = useFetchProjects();

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Erreur : {error.message}</div>;

  return <ProjectList projects={projects} />;
}
```

### Props et valeurs par défaut

- Limiter les props obligatoires au strict nécessaire et définir des `defaultProps`/valeurs par défaut.
- Utiliser des unions discriminées pour les variantes exclusives.
- Documenter les props via TSDoc pour faciliter l'autocomplétion.

### Accessibilité & i18n

- Tous les composants doivent rester accessibles au clavier et exposer des focus visibles.
- Internationaliser le texte : passer les libellés via props ou hooks de traduction, ne pas hardcoder.
- Utiliser les balises sémantiques (`<header>`, `<footer>`, `<section role="region">`) lorsque pertinent.

### Documentation visuelle

- Chaque composant réutilisable doit être documenté (Storybook ou MDX) avec :
  - États par défaut, variantes et modes désactivés
  - Thèmes clair/sombre
  - Exemples multi-langues si nécessaire

---

## Gestion d'état

Choisir la solution la plus légère possible et garder les composants de présentation exempts d'effets de bord.

### Types d'états

- **État local UI** – `useState` ou `useReducer` directement dans le composant/hook (modales, formulaires, onglets).
- **État dérivé** – calculer via `useMemo`/sélecteurs plutôt que stocker des duplicatas.
- **État serveur/cache** – `react-query`, `SWR` ou loaders framework pour gérer cache, retries, revalidation.
- **État global** – Auth, thème, feature flags via Context + hooks ou librairies légères (Zustand, Jotai). Limiter la surface exposée.

#### Exemple : État local

```tsx
// État local simple
function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Ouvrir</button>
      {isOpen && (
        <div className="modal">
          <button onClick={() => setIsOpen(false)}>Fermer</button>
        </div>
      )}
    </>
  );
}

// État local complexe avec useReducer
interface TabState {
  activeTab: string;
  tabs: string[];
}

function tabReducer(state: TabState, action: { type: string; tab?: string }) {
  switch (action.type) {
    case 'SELECT_TAB':
      return { ...state, activeTab: action.tab! };
    default:
      return state;
  }
}

function Tabs() {
  const [state, dispatch] = useReducer(tabReducer, {
    activeTab: 'tab1',
    tabs: ['tab1', 'tab2', 'tab3'],
  });

  return (
    <div>
      {state.tabs.map(tab => (
        <button
          key={tab}
          onClick={() => dispatch({ type: 'SELECT_TAB', tab })}
          className={state.activeTab === tab ? 'active' : ''}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
```

### Lignes directrices

1. **Colocaliser** : conserver l'état au plus proche des composants qui l'utilisent.
2. **Encapsuler** : déplacer effets et requêtes dans des hooks (`useUserProfile`) afin que les composants restent déclaratifs.
3. **Normaliser** : mapper les réponses API vers des modèles UI dans les services/hooks, pas dans les composants.
4. **Éviter le prop drilling** : à partir de trois niveaux, créer un contexte ou une boutique de feature.
5. **Immutabilité** : ne jamais muter les objets/arrays en place.

### Données asynchrones

- Préférer les solutions compatibles Suspense lorsque possible.
- Gérer explicitement les états `loading`, `error`, `empty`. Les blocs réutilisables doivent accepter ces props pour rester prévisibles.
- Annuler les requêtes dans les cleanups (`AbortController`).

#### Exemple : React Query avec Suspense

```tsx
// hooks/useProjects.ts
import { useQuery } from '@tanstack/react-query';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => fetch('/api/projects').then(res => res.json()),
    suspense: true, // Activer Suspense
  });
}

// Composant avec Suspense:
import { Suspense } from 'react';
import { useProjects } from '@/hooks/useProjects';

function ProjectsList() {
  const { data: projects } = useProjects(); // Suspense gère le chargement
  
  return (
    <ul>
      {projects.map(project => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

export function ProjectsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary>
        <ProjectsList />
      </ErrorBoundary>
    </Suspense>
  );
}
```

#### Exemple : Fetch manuel avec nettoyage

```tsx
function useFetchProjects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/projects', { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort(); // Annuler au démontage
  }, []);

  return { data, loading, error };
}
```

### Formulaires

- Utiliser `react-hook-form` ou `Formik` pour les formulaires complexes (validation, perf).
- Centraliser les champs (input, select, bouton) afin d'uniformiser styles et messages d'erreur.

#### Exemple : React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Mot de passe"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Connexion...' : 'Se connecter'}
      </Button>
    </form>
  );
}
```

### Persistance

- Persister uniquement ce qui est indispensable (token, thème). Versionner les clés `localStorage`/IndexedDB et prévoir des migrations.
- Ne jamais stocker de secrets ni de données aisément recalculables.

#### Exemple : Hook d'état persistant

```tsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Utilisation:
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Thème actuel : {theme}
    </button>
  );
}
```

---

## Styles

Une approche cohérente du styling garantit que header, footer, boutons et blocs réutilisables partagent la même identité visuelle.

### Approches privilégiées

- **Design tokens** : définir couleurs, typo, espacements, rayons, ombres et z-index dans `styles/tokens.ts` ou via des variables CSS.
- **Styles scoppés** : favoriser CSS Modules, Tailwind ou CSS-in-JS compatible SSR.
- **Compatibilité serveur** : vérifier que la solution choisie supporte SSR/SSG (styled-components + Babel plugin, Vanilla Extract, etc.).

#### Exemple : Design Tokens

```tsx
// styles/tokens.ts
export const tokens = {
  colors: {
    primary: '#0066cc',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    background: '#ffffff',
    text: '#212529',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
};

// Alternative avec variables CSS:
// styles/tokens.css
:root {
  --color-primary: #0066cc;
  --spacing-md: 1rem;
  --font-size-base: 1rem;
}
```

### Organisation des fichiers

- `styles/global.css` ou `styles/global.ts` pour les resets et la typo.
- Styles spécifiques à un composant à côté du fichier React (`Component.module.css`, `Component.styles.ts`).
- Les primitives partagées (header, footer, boutons, blocs) consomment les tokens via un point d'entrée unique afin d'éviter les divergences.

#### Exemple : CSS Modules

```css
/* components/ui/Button/Button.module.css */
.button {
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-family: var(--font-family);
  cursor: pointer;
  transition: all 0.2s;
}

.button--primary {
  background-color: var(--color-primary);
  color: white;
}

.button--primary:hover {
  background-color: #0052a3;
}

.button--secondary {
  background-color: var(--color-secondary);
  color: white;
}
```

```tsx
// components/ui/Button/Button.tsx
import styles from './Button.module.css';

export function Button({ variant = 'primary', ...props }) {
  return (
    <button 
      className={`${styles.button} ${styles[`button--${variant}`]}`}
      {...props}
    />
  );
}
```

### Nommage & conventions

- Utiliser des noms descriptifs type BEM pour le CSS pur (`.header__nav`, `.footer__cta`).
- Pour Tailwind, configurer les presets dans `tailwind.config.js` pour coller aux tokens.
- Limiter les styles inline aux cas dynamiques impraticables en CSS (canvas, calculs à la volée).

### Responsive design

- Concevoir mobile-first et monter en min-width.
- Créer des primitives de layout (`<Stack>`, `<Grid>`, `<Section>`) qui appliquent les espacements communs.
- Les blocs réutilisables doivent accepter des props responsive (`columns={{ base: 1, md: 2 }}`) afin de garder des interfaces déclaratives.

#### Exemple : Composants de layout responsive

```tsx
// components/layout/Stack.tsx
interface StackProps {
  direction?: 'row' | 'column';
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Stack({ direction = 'column', gap = 'md', children }: StackProps) {
  return (
    <div 
      className={`stack stack--${direction} stack--gap-${gap}`}
    >
      {children}
    </div>
  );
}

// components/layout/Grid.tsx
interface GridProps {
  columns?: { base?: number; md?: number; lg?: number };
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Grid({ columns = { base: 1 }, gap = 'md', children }: GridProps) {
  const columnClasses = [
    columns.base && `grid--cols-${columns.base}`,
    columns.md && `md:grid--cols-${columns.md}`,
    columns.lg && `lg:grid--cols-${columns.lg}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={`grid grid--gap-${gap} ${columnClasses}`}>
      {children}
    </div>
  );
}

// Utilisation:
<Grid columns={{ base: 1, md: 2, lg: 3 }} gap="lg">
  <FeatureCard />
  <FeatureCard />
  <FeatureCard />
</Grid>
```

### Mode sombre & thèmes

- Gérer les thèmes via variables CSS ou `ThemeProvider`.
- Vérifier que header, footer et boutons respectent le thème courant sans valeurs codées en dur.
- Tester toutes les variantes sur fonds clairs/foncés pour garantir les ratios de contraste.

#### Exemple : Theme Provider

```tsx
// components/providers/ThemeProvider.tsx
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme doit être utilisé dans ThemeProvider');
  return context;
}

// CSS:
/* styles/themes.css */
[data-theme='light'] {
  --color-background: #ffffff;
  --color-text: #212529;
}

[data-theme='dark'] {
  --color-background: #121212;
  --color-text: #ffffff;
}
```

### Accessibilité

- Respecter WCAG (4.5:1 pour le texte standard).
- Ne jamais communiquer un état uniquement par la couleur ; ajouter icône ou texte.
- Conserver des focus visibles pour tous les éléments interactifs, y compris les boutons personnalisés.

### Gestion des assets

- Optimiser les images de sections réutilisées (`<picture>`, `srcset`, composant Next/Image).
- Précharger les polices critiques et prévoir des polices de secours système.

---

## Tests

Tester garantit le bon fonctionnement des composants partagés (header, footer, boutons, blocs) sur toutes les pages.

### Outils

- **Unitaires / intégration** : React Testing Library + Vitest/Jest (environnement jsdom).
- **Mock** : MSW pour les appels HTTP, fixtures dédiées pour les stores.
- **E2E** : Playwright ou Cypress.
- **Accessibilité** : `@testing-library/jest-dom` + `axe-core`.

### Pyramide de tests

1. **Unitaires** – composants, hooks, utils isolés.
2. **Intégration** – routes/flows complets avec APIs mockées.
3. **E2E** – parcours réels dans un navigateur.

### Tests de composants

- Interagir comme un utilisateur (`screen.getByRole`, `getByText`), limiter `data-testid`.
- Couvrir les props critiques (navigation du header, variantes de boutons, sections personnalisables).
- Vérifier focus, gestion clavier et attributs ARIA.

```tsx
it('affiche le bloc hero avec CTA', () => {
  render(<HeroBlock heading="Construisez plus vite" ctaLabel="Commencer" />);
  expect(screen.getByRole('heading', { name: /construisez plus vite/i })).toBeVisible();
  expect(screen.getByRole('button', { name: /commencer/i })).toHaveAttribute('data-variant', 'primary');
});
```

### Hooks & état

- Utiliser `renderHook` + `act` et mocker le réseau/contexte requis.
- Vérifier la stabilité des références lorsque les dépendances ne changent pas.

#### Exemple : Test de hook personnalisé

```tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchProjects } from '@/hooks/useFetchProjects';
import { projectService } from '@/services/projectService';

jest.mock('@/services/projectService');

describe('useFetchProjects', () => {
  it('récupère les projets au montage', async () => {
    const mockProjects = [{ id: '1', name: 'Projet 1' }];
    (projectService.getAll as jest.Mock).resolves(mockProjects);

    const { result } = renderHook(() => useFetchProjects());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.projects).toEqual(mockProjects);
  });

  it('gère les erreurs', async () => {
    const mockError = new Error('Échec de la récupération');
    (projectService.getAll as jest.Mock).rejects(mockError);

    const { result } = renderHook(() => useFetchProjects());

    await waitFor(() => {
      expect(result.current.error).toEqual(mockError);
    });
  });
});
```

### Tests d'intégration

- Rendre les routes complètes avec `Header` + `Footer` pour capturer les régressions de providers.
- Mocker les réponses via MSW pour rester déterministe.
- Contrôler les effets (analytics, stockage) via des espions.

#### Exemple : Test d'intégration avec MSW

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { HomePage } from '@/app/home/HomePage';

const server = setupServer(
  http.get('/api/features', () => {
    return HttpResponse.json([
      { id: '1', title: 'Fonctionnalité 1' },
      { id: '2', title: 'Fonctionnalité 2' },
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Intégration HomePage', () => {
  it('affiche header, hero et fonctionnalités', async () => {
    render(<HomePage />);

    // Vérifier la présence du header
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Vérifier le bloc hero
    expect(screen.getByRole('heading', { name: /bienvenue/i })).toBeInTheDocument();

    // Attendre le chargement des fonctionnalités
    await waitFor(() => {
      expect(screen.getByText('Fonctionnalité 1')).toBeInTheDocument();
    });

    // Vérifier le footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
```

### Tests E2E

- Automatiser les parcours clés : authentification, navigation contenu, achats.
- Exécuter sur des builds proches de la prod (preview, staging).
- Capturer des screenshots pour les blocs critiques (hero, pricing, CTA).

#### Exemple : Test E2E avec Playwright

```tsx
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Page d\'accueil', () => {
  test('devrait afficher header, hero et footer', async ({ page }) => {
    await page.goto('/');

    // Vérifier la navigation du header
    await expect(page.getByRole('link', { name: 'Accueil' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'À propos' })).toBeVisible();

    // Vérifier la section hero
    await expect(page.getByRole('heading', { name: /bienvenue/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /commencer/i })).toBeVisible();

    // Vérifier le footer
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('devrait naviguer vers signup depuis le CTA', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /commencer/i }).click();
    await expect(page).toHaveURL('/signup');
  });
});
```

### Couverture attendue

- 80 %+ de couverture sur composants partagés et hooks.
- 100 % sur les primitives design system (boutons, navigation).
- Au moins une suite E2E smoke par pipeline.

Les tests doivent tourner en CI sur chaque pull request afin d'éviter les régressions côté React.

---

## Bonnes pratiques

Ces principes maintiennent nos bases de code React prévisibles, accessibles et alignées avec les autres plateformes du projet.

### Langage & tooling

- Utiliser **TypeScript** partout avec `strict: true`.
- S'appuyer sur l'outillage recommandé par le framework (Vite, Next.js, Remix) et éviter les éjections.
- Faire respecter `prettier` + `eslint` en local et en CI.

### Hygiène des composants

- Viser <200 lignes par composant. Extraire la logique dans des hooks ou sous-composants si besoin.
- Préférer les exports nommés pour améliorer les traces de stack.
- Ne mémoïser (`React.memo`, `useMemo`, `useCallback`) qu'après mesure via le profiler.

#### Exemple : Découpage de composant

```tsx
// ❌ Mauvais : Composant monolithique
export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState({});
  // ... 300+ lignes de logique
}

// ✅ Bon : Découpage en petits composants
export function UserProfile() {
  const { user } = useUser();
  return (
    <div>
      <UserHeader user={user} />
      <UserPosts userId={user.id} />
      <UserSettings userId={user.id} />
    </div>
  );
}

// Les exports nommés améliorent le débogage:
export { UserProfile };
```

### Données & effets

- Centraliser les appels réseau dans des hooks/services, pas dans les composants de présentation.
- Utiliser `react-query`, `SWR` ou les loaders framework pour gérer cache, retries et revalidation.
- Nettoyer tous les effets (`AbortController`, clearTimeout) pour éviter les fuites mémoire.

#### Exemple : Récupération de données avec React Query

```tsx
// hooks/useProjects.ts
import { useQuery } from '@tanstack/react-query';
import { projectService } from '@/services/projectService';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Composant:
import { useProjects } from '@/hooks/useProjects';

export function ProjectsList() {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ul>
      {projects?.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}
```

#### Exemple : Nettoyage dans useEffect

```tsx
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(console.error);

  const timeoutId = setTimeout(() => {
    // Action différée
  }, 1000);

  return () => {
    controller.abort(); // Annuler le fetch
    clearTimeout(timeoutId); // Nettoyer le timeout
  };
}, []);
```

### Accessibilité

- Partir d'un HTML sémantique puis enrichir si nécessaire.
- Respecter l'ordre de tabulation visuel et fournir des focus visibles.
- N'employer `aria-*` qu'en complément lorsque les éléments natifs ne suffisent pas.

### Performance

- Découper le code par route et par gros composants (`React.lazy`, `next/dynamic`).
- Reporter les scripts non critiques (`async`, `defer`, `requestIdleCallback`).
- Mémoïser les dérivés coûteux à l'aide de sélecteurs ou `useMemo`.

#### Exemple : Découpage de code

```tsx
// Chargement différé de composants lourds
import { lazy, Suspense } from 'react';

const HeavyModal = lazy(() => import('./HeavyModal'));
const ChartLibrary = lazy(() => import('./ChartLibrary'));

export function Dashboard() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <HeavyModal />
      </Suspense>
      <Suspense fallback={<div>Chargement du graphique...</div>}>
        <ChartLibrary />
      </Suspense>
    </div>
  );
}

// Import dynamique Next.js:
import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('./Chart'), {
  loading: () => <p>Chargement...</p>,
  ssr: false, // Désactiver SSR si nécessaire
});
```

#### Exemple : Mémoïsation

```tsx
// Mémoïser uniquement si le profiler le justifie
import { useMemo } from 'react';

export function ExpensiveList({ items, filter }) {
  // Mémoïser le calcul coûteux
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Styles & thèmes

- Centraliser les design tokens et les réutiliser dans header, footer, boutons et blocs.
- Garder les styles spécifiques à une page scoppés (CSS Modules, CSS-in-JS, Tailwind).

### Tests & qualité

- Respecter la pyramide de tests : unitaires (React Testing Library), intégration (routes + MSW), E2E (Playwright/Cypress).
- Tester depuis le point de vue utilisateur : rôles, texte, interactions clavier.
- Automatiser les checks accessibilité/visuels dans la CI.

### Documentation

- Chaque dossier feature doit documenter architecture, API et choix techniques.
- Documenter les composants réutilisables (header, footer, boutons, blocs) dans Storybook/MDX.

---

**Appliquer ces bonnes pratiques rapproche la qualité de nos projets React des conventions Flutter et Unity décrites dans cette documentation.**

