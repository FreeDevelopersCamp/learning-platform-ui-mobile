import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
        :root {
                /* Borders */
                --color-border-light: rgba(224, 224, 224, 0.5);
                --color-border-dark: rgba(64, 64, 64, 0.5);


                &, &.light-mode {
                        /* Grey */
                        --color-grey-0: #fff;
                ${"" /* --color-grey-50: #f9fafb; */}
                        --color-grey-50: #F7F7FC;
                        --color-grey-100: #f3f4f6;
                        --color-grey-200: #e5e7eb;
                        --color-grey-300: #d1d5db;
                        --color-grey-400: #9ca3af;
                        --color-grey-500: #6b7280;
                        --color-grey-600: #4b5563;
                        --color-grey-700: #374151;
                        --color-grey-800: #1f2937;
                        --color-grey-900: #111827;

                        --color-softgray-50: #fafafa;
                        --color-softgray-100: #f5f5f5;
                        --color-softgray-200: #e0e0e0;
                        --color-softgray-300: #bdbdbd;
                        --color-softgray-400: #9e9e9e;
                        --color-softgray-500: #757575;
                        --color-softgray-600: #616161;
                        --color-softgray-700: #424242;
                        --color-softgray-800: #212121;
                        --color-softgray-900: #121212;

                        /* Cool Gray */
                        --color-coolgray-50: #f9fafb;
                        --color-coolgray-100: #f3f4f6;
                        --color-coolgray-200: #e5e7eb;
                        --color-coolgray-500: #6b7280;
                        --color-coolgray-600: #4b5563;
                        --color-coolgray-700: #374151;
                        --color-coolgray-800: #1f2937;
                        --color-coolgray-900: #111827;


                        --color-blue-100: #e0f2fe;
                        --color-blue-700: #0369a1;
                        --color-green-100: #dcfce7;
                        --color-green-700: #15803d;
                        --color-yellow-100: #fef9c3;
                        --color-yellow-700: #a16207;
                        --color-silver-100: #e5e7eb;
                        --color-silver-700: #374151;
                        --color-indigo-100: #e0e7ff;
                        --color-indigo-700: #4338ca;

                        /* Indigo */
                        --color-brand-50: #eef2ff;
                        --color-brand-100: #e0e7ff;
                        --color-brand-200: #c7d2fe;
                        --color-brand-500: #6366f1;
                        --color-brand-600: #4f46e5;
                        --color-brand-700: #4338ca;
                        --color-brand-800: #3730a3;
                        --color-brand-900: #312e81;

                        /* Indigo */
                        --color-indigo-50: #eef2ff;
                        --color-indigo-100: #e0e7ff;
                        --color-indigo-200: #c7d2fe;
                        --color-indigo-500: #6366f1;
                        --color-indigo-600: #4f46e5;
                        --color-indigo-700: #4338ca;
                        --color-indigo-800: #3730a3;
                        --color-indigo-900: #312e81;
                        /* Teal */
                        --color-teal-50: #f0fdfa;
                        --color-teal-100: #ccfbf1;
                        --color-teal-200: #99f6e4;
                        --color-teal-500: #14b8a6;
                        --color-teal-600: #0d9488;
                        --color-teal-700: #0f766e;
                        --color-teal-800: #115e59;
                        --color-teal-900: #134e4a;
                        /* Amber */
                        --color-amber-50: #fffbeb;
                        --color-amber-100: #fef3c7;
                        --color-amber-200: #fde68a;
                        --color-amber-500: #f59e0b;
                        --color-amber-600: #d97706;
                        --color-amber-700: #b45309;
                        --color-amber-800: #92400e;
                        --color-amber-900: #78350f;
                        /* Purple */
                        --color-purple-50: #f5f3ff;
                        --color-purple-100: #ede9fe;
                        --color-purple-200: #ddd6fe;
                        --color-purple-500: #8b5cf6;
                        --color-purple-600: #7c3aed;
                        --color-purple-700: #6d28d9;
                        --color-purple-800: #5b21b6;
                        --color-purple-900: #4c1d95;
                        /* Rose */
                        --color-rose-50: #fff1f2;
                        --color-rose-100: #ffe4e6;
                        --color-rose-200: #fecdd3;
                        --color-rose-500: #f43f5e;
                        --color-rose-600: #e11d48;
                        --color-rose-700: #be123c;
                        --color-rose-800: #9f1239;
                        --color-rose-900: #881337;
                        /* Orange */
                        --color-orange-50: #fff7ed;
                        --color-orange-100: #ffedd5;
                        --color-orange-200: #fed7aa;
                        --color-orange-500: #f97316;
                        --color-orange-600: #ea580c;
                        --color-orange-700: #c2410c;
                        --color-orange-800: #9a3412;
                        --color-orange-900: #7c2d12;
                        /* Lime */
                        --color-lime-50: #f7fee7;
                        --color-lime-100: #ecfccb;
                        --color-lime-200: #d9f99d;
                        --color-lime-500: #84cc16;
                        --color-lime-600: #65a30d;
                        --color-lime-700: #4d7c0f;
                        --color-lime-800: #3f6212;
                        --color-lime-900: #365314;
                        /* Pink */
                        --color-pink-50: #fdf2f8;
                        --color-pink-100: #fce7f3;
                        --color-pink-200: #fbcfe8;
                        --color-pink-500: #ec4899;
                        --color-pink-600: #db2777;
                        --color-pink-700: #be185d;
                        --color-pink-800: #9d174d;
                        --color-pink-900: #831843;
                        /* Emerald */
                        --color-emerald-50: #ecfdf5;
                        --color-emerald-100: #d1fae5;
                        --color-emerald-200: #a7f3d0;
                        --color-emerald-500: #10b981;
                        --color-emerald-600: #059669;
                        --color-emerald-700: #047857;
                        --color-emerald-800: #065f46;
                        --color-emerald-900: #064e3b;
                        /* Blue */
                        --color-blue-50: #eff6ff;
                        --color-blue-100: #dbeafe;
                        --color-blue-200: #bfdbfe;
                        --color-blue-500: #3b82f6;
                        --color-blue-600: #2563eb;
                        --color-blue-700: #1d4ed8;
                        --color-blue-800: #1e40af;
                        --color-blue-900: #1e3a8a;

                        --color-skyblue-50: #e0f7fa;
                        --color-skyblue-100: #b2ebf2;
                        --color-skyblue-200: #80deea;
                        --color-skyblue-300: #4dd0e1;
                        --color-skyblue-400: #26c6da;
                        --color-skyblue-500: #00bcd4;
                        --color-skyblue-600: #00acc1;
                        --color-skyblue-700: #0097a7;
                        --color-skyblue-800: #00838f;
                        --color-skyblue-900: #006064;

                        --color-midnightblue-50: #e8f1f8;
                        --color-midnightblue-100: #c2d8e9;
                        --color-midnightblue-200: #9abfdb;
                        --color-midnightblue-300: #72a6cd;
                        --color-midnightblue-400: #4a8dbe;
                        --color-midnightblue-500: #2269b0;
                        --color-midnightblue-600: #1a5f9c;
                        --color-midnightblue-700: #154e89;
                        --color-midnightblue-800: #103c75;
                        --color-midnightblue-900: #0a2b61;

                        --color-darkmidnightblue-50: #d6e0f1;
                        --color-darkmidnightblue-100: #a5b8e1;
                        --color-darkmidnightblue-200: #7490d1;
                        --color-darkmidnightblue-300: #4b68c1;
                        --color-darkmidnightblue-400: #2240b1;
                        --color-darkmidnightblue-500: #002090;
                        --color-darkmidnightblue-600: #001a7a;
                        --color-darkmidnightblue-700: #001362;
                        --color-darkmidnightblue-800: #000d4a;
                        --color-darkmidnightblue-900: #000634;

                        --color-mutedblue-50: #e1e8f2;
                        --color-mutedblue-100: #c0cde7;
                        --color-mutedblue-200: #9fa8dc;
                        --color-mutedblue-300: #7f86d1;
                        --color-mutedblue-400: #5f65c6;
                        --color-mutedblue-500: #3f44bb;
                        --color-mutedblue-600: #2e358b;
                        --color-mutedblue-700: #1d2673;
                        --color-mutedblue-800: #0c195b;
                        --color-mutedblue-900: #040e43;

                        --color-dark-blue-50: #e4eaf5; /* lightest pastel */
                        --color-dark-blue-100: #c2d1e9; /* soft, light blue */
                        --color-dark-blue-200: #9aa7d8; /* light blue-gray */
                        --color-dark-blue-300: #7586c7; /* soft blue-gray */
                        --color-dark-blue-400: #5a6baf; /* muted blue */
                        --color-dark-blue-500: #152244; /* primary color */
                        --color-dark-blue-600: #1a2d5b; /* slightly darker blue */
                        --color-dark-blue-700: #203758; /* darker blue */
                        --color-dark-blue-800: #243b6c; /* deep blue */
                        --color-dark-blue-900: #2a406f; /* dark, rich blue */


                        /* Cyan */
                        --color-cyan-50: #ecfeff;
                        --color-cyan-100: #cffafe;
                        --color-cyan-200: #a5f3fc;
                        --color-cyan-500: #06b6d4;
                        --color-cyan-600: #0891b2;
                        --color-cyan-700: #0e7490;
                        --color-cyan-800: #155e75;
                        --color-cyan-900: #164e63;

                        --color-warm-50: #fff7e6;
                        --color-warm-100: #ffebcc;
                        --color-warm-200: #ffd699;
                        --color-warm-300: #ffcc66;
                        --color-warm-400: #ffbf33;
                        --color-warm-500: #ffb300;
                        --color-warm-600: #e68a00;
                        --color-warm-700: #cc7400;
                        --color-warm-800: #b35e00;
                        --color-warm-900: #994800;

                        --color-warm-50: #fff7e6;
                        --color-warm-100: #ffebcc;
                        --color-warm-200: #ffd699;
                        --color-warm-300: #ffcc66;
                        --color-warm-400: #ffbf33;
                        --color-warm-500: #ffb300;
                        --color-warm-600: #e68a00;
                        --color-warm-700: #cc7400;
                        --color-warm-800: #b35e00;
                        --color-warm-900: #994800;

                        --color-warm-950: #7a3d00;
                        --color-warm-1000: #602a00;
                        --color-warm-1100: #4f1c00;
                        --color-warm-1200: #3e1400;
                        --color-warm-1300: #2d0f00;
                        --color-warm-1400: #1b0900;
                        --color-warm-1500: #0a0300;
                        --color-warm-1600: #000000;

                        --color-yellow-green-50: #f7fddf; /* lightest pastel */
                        --color-yellow-green-100: #effbc1; /* soft pastel yellow-green */
                        --color-yellow-green-200: #d4f88c; /* light lime */
                        --color-yellow-green-300: #b2f659; /* bright lime */
                        --color-yellow-green-400: #a4e64d; /* slightly muted lime */
                        --color-yellow-green-500: #baff0f; /* primary color */
                        --color-yellow-green-600: #98e40b; /* slightly darker lime */
                        --color-yellow-green-700: #7bd407; /* darker lime */
                        --color-yellow-green-800: #64b505; /* deep lime */
                        --color-yellow-green-900: #539e04; /* dark greenish yellow */

                        /* Light Mode Colors */
                        --color-light-green-50: #e5f8e2;
                        --color-light-green-100: #c1e7c3;
                        --color-light-green-200: #9bd6a5;
                        --color-light-green-300: #76c886;
                        --color-light-green-400: #51b567;
                        --color-light-green-500: #0BCC11; /* Main Green */
                        --color-light-green-600: #0a9e0d;
                        --color-light-green-700: #077a0b;
                        --color-light-green-800: #064f08;
                        --color-light-green-900: #033301; /* Darkest Green */

                        --color-light-50: #f9fafb; /* Off-white */
                        --color-light-100: #f1f5f9;
                        --color-light-200: #e2e8f0;
                        --color-light-300: #cfd8e3;
                        --color-light-400: #aab8d2;
                        --color-light-500: #7b94b2;
                        --color-light-600: #5d6b93;
                        --color-light-700: #3f4a74;
                        --color-light-800: #2a2f56;
                        --color-light-900: #1a213a; /* Darkest Blue-Gray */

                        /* Greens for Light Mode */
                        --color-green-50: #132118;
                        --color-green-100: #1a3327;
                        --color-green-200: #27533d;
                        --color-green-500: #2dcd86; /* Bright for success indicators */
                        --color-green-600: #27ad70;
                        --color-green-700: #1f8b59;
                        --color-green-800: #176a43;
                        --color-green-900: #114f32;

                        /* Reds for Dark Mode */
                        --color-red-50: #e74c3c; /* Bright for errors */
                        --color-red-300: #c24335;
                        --color-red-600: #9a372c;
                        --color-red-100: #762b22;
                        --color-red-400: #6a2e33;
                        --color-red-500: #53201a;
                        --color-red-800: #3c1a1d;
                        --color-red-900: #231012;

                        --color-theme-100: #f4f8fc; /* Very light */
                        --color-theme-200: #e1e8f3; /* Light grayish blue */
                        --color-theme-300: #c0cce8; /* Light muted blue */
                        --color-theme-400: #a0b8e1; /* Lighter blue */
                        --color-theme-500: #18212f; /* Main color */
                        --color-theme-600: #5a6d7c; /* Muted blue */
                        --color-theme-700: #455463; /* Medium dark blue */
                        --color-theme-800: #37414f; /* Darker muted blue */
                        --color-theme-900: #2c353f; /* Dark grayish blue */

                        --backdrop-color: rgba(255, 255, 255, 0.1);

                        --shadow-sm: 0 1px 2px rgba(200, 200, 200, 0.04);
                        --shadow-md: 0px 0.6rem 2.4rem rgba(200, 200, 200, 0.08);
                        --shadow-lg: 0 2.4rem 3.2rem rgba(200, 200, 200, 0.12);

                        --border-color: var(--color-border-light);

                        --image-grayscale: 0;
                        --image-opacity: 100%;
                }

                &.dark-mode {
                        --color-theme-100: #1a2a3b; /* Slightly lighter */
                        --color-theme-200: #1f3549;
                        --color-theme-300: #243f58;
                        --color-theme-400: #2a4a66;
                        --color-theme-500: #18212f; /* Main color */
                        --color-theme-600: #1d2b39;
                        --color-theme-700: #253547;
                        --color-theme-800: #2c3f54;
                        --color-theme-900: #344859; /* Darker */

                        --color-grey-0: #18212f;
                ${"" /* --color-grey-0: #202124; */}
                        --color-grey-50: #2d2f36; /* Slightly lighter for contrast */
                        --color-grey-100: #3c4047;
                        --color-grey-200: #50545c;
                        --color-grey-300: #62666e;
                        --color-grey-400: #7b7f87;
                        --color-grey-500: #93979f;
                        --color-grey-600: #afb3bb;
                        --color-grey-700: #d1d5db;
                        --color-grey-800: #e5e7eb;
                        --color-grey-900: #f9fafb;

                        --color-softgray-50: #212121;
                        --color-softgray-100: #424242;
                        --color-softgray-200: #616161;
                        --color-softgray-300: #757575;
                        --color-softgray-400: #9e9e9e;
                        --color-softgray-500: #bdbdbd;
                        --color-softgray-600: #e0e0e0;
                        --color-softgray-700: #f5f5f5;
                        --color-softgray-800: #fafafa;
                        --color-softgray-900: #ffffff;

                        /* Cool Gray */
                        --color-coolgray-50: #111827;
                        --color-coolgray-100: #1f2937;
                        --color-coolgray-200: #374151;
                        --color-coolgray-500: #6b7280;
                        --color-coolgray-600: #4b5563;
                        --color-coolgray-700: #e5e7eb;
                        --color-coolgray-800: #f3f4f6;
                        --color-coolgray-900: #f9fafb;


                        --color-blue-100: #075985;
                        --color-blue-700: #e0f2fe;
                        --color-green-100: #166534;
                        --color-green-700: #dcfce7;
                        --color-yellow-100: #854d0e;
                        --color-yellow-700: #fef9c3;
                        --color-silver-100: #374151;
                        --color-silver-700: #f3f4f6;
                        --color-indigo-100: #3730a3;
                        --color-indigo-700: #e0e7ff;


                        /* Indigo */
                        --color-brand-50: #312e81;
                        --color-brand-100: #3730a3;
                        --color-brand-200: #4338ca;
                        --color-brand-500: #6366f1;
                        --color-brand-600: #4f46e5;
                        --color-brand-700: #c7d2fe;
                        --color-brand-800: #e0e7ff;
                        --color-brand-900: #eef2ff;

                        /* Indigo */
                        --color-indigo-50: #312e81;
                        --color-indigo-100: #3730a3;
                        --color-indigo-200: #4338ca;
                        --color-indigo-500: #6366f1;
                        --color-indigo-600: #4f46e5;
                        --color-indigo-700: #c7d2fe;
                        --color-indigo-800: #e0e7ff;
                        --color-indigo-900: #eef2ff;

                        /* Teal */
                        --color-teal-50: #134e4a;
                        --color-teal-100: #115e59;
                        --color-teal-200: #0f766e;
                        --color-teal-500: #14b8a6;
                        --color-teal-600: #0d9488;
                        --color-teal-700: #99f6e4;
                        --color-teal-800: #ccfbf1;
                        --color-teal-900: #f0fdfa;

                        /* Amber */
                        --color-amber-50: #78350f;
                        --color-amber-100: #92400e;
                        --color-amber-200: #b45309;
                        --color-amber-500: #f59e0b;
                        --color-amber-600: #d97706;
                        --color-amber-700: #fde68a;
                        --color-amber-800: #fef3c7;
                        --color-amber-900: #fffbeb;

                        /* Purple */
                        --color-purple-50: #4c1d95;
                        --color-purple-100: #5b21b6;
                        --color-purple-200: #6d28d9;
                        --color-purple-500: #8b5cf6;
                        --color-purple-600: #7c3aed;
                        --color-purple-700: #ddd6fe;
                        --color-purple-800: #ede9fe;
                        --color-purple-900: #f5f3ff;

                        /* Rose */
                        --color-rose-50: #881337;
                        --color-rose-100: #9f1239;
                        --color-rose-200: #be123c;
                        --color-rose-500: #f43f5e;
                        --color-rose-600: #e11d48;
                        --color-rose-700: #fecdd3;
                        --color-rose-800: #ffe4e6;
                        --color-rose-900: #fff1f2;

                        /* Orange */
                        --color-orange-50: #7c2d12;
                        --color-orange-100: #9a3412;
                        --color-orange-200: #c2410c;
                        --color-orange-500: #f97316;
                        --color-orange-600: #ea580c;
                        --color-orange-700: #fed7aa;
                        --color-orange-800: #ffedd5;
                        --color-orange-900: #fff7ed;

                        /* Lime */
                        --color-lime-50: #365314;
                        --color-lime-100: #3f6212;
                        --color-lime-200: #4d7c0f;
                        --color-lime-500: #84cc16;
                        --color-lime-600: #65a30d;
                        --color-lime-700: #d9f99d;
                        --color-lime-800: #ecfccb;
                        --color-lime-900: #f7fee7;

                        /* Pink */
                        --color-pink-50: #831843;
                        --color-pink-100: #9d174d;
                        --color-pink-200: #be185d;
                        --color-pink-500: #ec4899;
                        --color-pink-600: #db2777;
                        --color-pink-700: #fbcfe8;
                        --color-pink-800: #fce7f3;
                        --color-pink-900: #fdf2f8;

                        /* Emerald */
                        --color-emerald-50: #064e3b;
                        --color-emerald-100: #065f46;
                        --color-emerald-200: #047857;
                        --color-emerald-500: #10b981;
                        --color-emerald-600: #059669;
                        --color-emerald-700: #a7f3d0;
                        --color-emerald-800: #d1fae5;
                        --color-emerald-900: #ecfdf5;

                        /* Blue */
                        --color-blue-50: #1e3a8a;
                        --color-blue-100: #1e40af;
                        --color-blue-200: #1d4ed8;
                        --color-blue-500: #3b82f6;
                        --color-blue-600: #2563eb;
                        --color-blue-700: #bfdbfe;
                        --color-blue-800: #dbeafe;
                        --color-blue-900: #eff6ff;

                        --color-skyblue-50: #006064;
                        --color-skyblue-100: #0097a7;
                        --color-skyblue-200: #00acc1;
                        --color-skyblue-300: #00bcd4;
                        --color-skyblue-400: #26c6da;
                        --color-skyblue-500: #4dd0e1;
                        --color-skyblue-600: #80deea;
                        --color-skyblue-700: #b2ebf2;
                        --color-skyblue-800: #e0f7fa;
                        --color-skyblue-900: #f0faff;

                        --color-midnightblue-50: #0a2b61;
                        --color-midnightblue-100: #103c75;
                        --color-midnightblue-200: #154e89;
                        --color-midnightblue-300: #1a5f9c;
                        --color-midnightblue-400: #2269b0;
                        --color-midnightblue-500: #4a8dbe;
                        --color-midnightblue-600: #72a6cd;
                        --color-midnightblue-700: #9abfdb;
                        --color-midnightblue-800: #c2d8e9;
                ${"" /* --color-midnightblue-900: #e8f1f8; */}
                        --color-midnightblue-900: #2a406f;

                        --color-darkmidnightblue-50: #000634;
                        --color-darkmidnightblue-100: #000d4a;
                        --color-darkmidnightblue-200: #001362;
                        --color-darkmidnightblue-300: #001a7a;
                        --color-darkmidnightblue-400: #002090;
                        --color-darkmidnightblue-500: #2240b1;
                        --color-darkmidnightblue-600: #4b68c1;
                        --color-darkmidnightblue-700: #7490d1;
                        --color-darkmidnightblue-800: #a5b8e1;
                        --color-darkmidnightblue-900: #d6e0f1;

                        --color-mutedblue-50: #040e43;
                        --color-mutedblue-100: #0c195b;
                        --color-mutedblue-200: #1d2673;
                        --color-mutedblue-300: #2e358b;
                        --color-mutedblue-400: #3f44bb;
                        --color-mutedblue-500: #5f65c6;
                        --color-mutedblue-600: #7f86d1;
                        --color-mutedblue-700: #9fa8dc;
                        --color-mutedblue-800: #c0cde7;
                ${"" /* --color-mutedblue-900: #e1e8f2; */}
                        --color-mutedblue-900: #111827;

                        --color-dark-blue-50: #2a406f; /* dark, rich blue */
                        --color-dark-blue-100: #243b6c; /* deep blue */
                        --color-dark-blue-200: #203758; /* darker blue */
                        --color-dark-blue-300: #1a2d5b; /* slightly darker blue */
                        --color-dark-blue-400: #152244; /* primary color */
                        --color-dark-blue-500: #5a6baf; /* muted blue */
                        --color-dark-blue-600: #7586c7; /* soft blue-gray */
                        --color-dark-blue-700: #9aa7d8; /* light blue-gray */
                        --color-dark-blue-800: #c2d1e9; /* soft, light blue */
                        --color-dark-blue-900: #e4eaf5; /* lightest pastel */


                        /* Cyan */
                        --color-cyan-50: #164e63;
                        --color-cyan-100: #155e75;
                        --color-cyan-200: #0e7490;
                        --color-cyan-500: #06b6d4;
                        --color-cyan-600: #0891b2;
                        --color-cyan-700: #a5f3fc;
                        --color-cyan-800: #cffafe;
                        --color-cyan-900: #ecfeff;

                        --color-warm-50: #994800;
                        --color-warm-100: #b35e00;
                        --color-warm-200: #cc7400;
                        --color-warm-300: #e68a00;
                        --color-warm-400: #ffb300;
                        --color-warm-500: #ffbf33;
                        --color-warm-600: #ffcc66;
                        --color-warm-700: #ffd699;
                        --color-warm-800: #ffebcc;
                        --color-warm-900: #fff7e6;

                        --color-warm-50: #994800;
                        --color-warm-100: #b35e00;
                        --color-warm-200: #cc7400;
                        --color-warm-300: #e68a00;
                        --color-warm-400: #ffb300;
                        --color-warm-500: #ffbf33;
                        --color-warm-600: #ffcc66;
                        --color-warm-700: #ffd699;
                        --color-warm-800: #ffebcc;
                        --color-warm-900: #fff7e6;

                        --color-warm-950: #ffcd2e;
                        --color-warm-1000: #ffb700;
                        --color-warm-1100: #ff9b00;
                        --color-warm-1200: #ff7e00;
                        --color-warm-1300: #ff6600;
                        --color-warm-1400: #e64b00;
                        --color-warm-1500: #cc3800;
                        --color-warm-1600: #b62d00;

                        --color-yellow-green-50: #539e04; /* dark greenish yellow */
                        --color-yellow-green-100: #64b505; /* deep lime */
                        --color-yellow-green-200: #7bd407; /* darker lime */
                        --color-yellow-green-300: #98e40b; /* slightly darker lime */
                        --color-yellow-green-400: #baff0f; /* primary color */
                        /* --color-yellow-green-500: #b2f659; /* bright lime */
                        --color-yellow-green-500: #7bd407; /* bright lime */
                        --color-yellow-green-600: #d4f88c; /* light lime */
                        --color-yellow-green-700: #effbc1; /* soft pastel yellow-green */
                        --color-yellow-green-800: #f7fddf; /* lightest pastel */
                        --color-yellow-green-900: #ffffff; /* very light */

                        --color-green-50: #132118;
                        --color-green-100: #1a3327;
                        --color-green-200: #27533d;
                        --color-green-500: #2dcd86; /* Bright for success indicators */
                        --color-green-600: #27ad70;
                        --color-green-700: #1f8b59;
                        --color-green-800: #176a43;
                        --color-green-900: #114f32;

                        /* Reds */
                        ${"" /* --color-red-50: #231012; */}
                        --color-red-50: #c24335;
                        --color-red-100: #3c1a1d;
                        --color-red-200: #6a2e33;
                        --color-red-300: #e74c3c; /* Bright for errors */
                        --color-red-600: #c24335;
                        --color-red-700: #9a372c;
                        --color-red-800: #762b22;
                        --color-red-900: #53201a;

                        /* Dark Mode Colors */
                        --color-dark-green-50: #0f5132;
                        --color-dark-green-100: #064e3b;
                        --color-dark-green-200: #047857;
                        --color-dark-green-300: #10b981;
                        --color-dark-green-400: #059669;
                        --color-dark-green-500: #0BCC11; /* Main Green */
                        --color-dark-green-600: #0a9e0d;
                        --color-dark-green-700: #077a0b;
                        --color-dark-green-800: #064f08;
                        --color-dark-green-900: #033301; /* Darkest Green */

                        --color-light-50: #1a213a; /* Darkest Blue-Gray */
                        --color-light-100: #2a2f56;
                        --color-light-200: #3f4a74;
                        --color-light-300: #5d6b93;
                        --color-light-400: #7b94b2;
                        --color-light-500: #aab8d2;
                        --color-light-600: #cfd8e3;
                        --color-light-700: #e2e8f0;
                        --color-light-800: #f1f5f9;
                        --color-light-900: #f9fafb; /* Off-white */



                        --backdrop-color: rgba(0, 0, 0, 0.3);


                        --image-grayscale: 5%;
                        --image-opacity: 95%;

                        /* Accent Colors */
                        --color-yellow-500: #f9c74f; /* For highlights/warnings */

                        /* Shadows */
                        --shadow-sm: 0 1px 2px rgba(100, 100, 100, 0.04);
                        --shadow-md: 0 4px 6px rgba(100, 100, 100, 0.08);
                        --shadow-lg: 0 10px 20px rgba(100, 100, 100, 0.12);

                        --border-color: var(--color-border-dark);

                }

                --header-height: 6rem;

                /* Font settings */
                --font-family-primary: 'Poppins', sans-serif; /* Main font */
                --font-family-secondary: 'Roboto', sans-serif; /* Optional fallback */
        }

        *,
        *::before,
        *::after {
                box-sizing: border-box;
                padding: 0;
                margin: 0;

                /* Creating animations for dark mode */
                transition: background-color 0.3s, border 0.3s;
        }

        html {
                font-size: 62.5%;
                overflow-y: scroll;
        }

        body {
                font-family: var(--font-family-primary),sans-serif;
                color: var(--color-grey-700);
                background-color: var(--color-grey-0); /* Apply global background */

                transition: color 0.3s, background-color 0.3s;
                min-height: 100vh;
                line-height: 1.5;
                font-size: 1.6rem;
        }


        input,
        button,
        textarea,
        select {
                font: inherit;
                color: inherit;
        }

        button {
                cursor: pointer;

                :focus,
                :active {
                        outline: none;
                        border: none;
                }
        }

        *:focus,
        *:active {
                outline: none;
        }


        *:disabled {
                cursor: not-allowed;
        }

        select:disabled,
        input:disabled {
                background-color: var(--color-grey-200);
                color: var(--color-grey-500);
        }

        input:focus,
        button:focus,
        textarea:focus,
        select:focus {
                outline: 2px solid var(--color-brand-600);
                outline-offset: -1px;
        }

        /* Parent selector, finally 😃 */
        button:has(svg) {
                line-height: 0;
        }

        a {
                color: inherit;
                text-decoration: none;
        }

        ul {
                list-style: none;
        }

        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
                overflow-wrap: break-word;
                hyphens: auto;
        }

        img {
                max-width: 100%;

                /* For dark mode */
                filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
        }

        .architects-daughter-regular {
                font-family: "Architects Daughter", cursive;
                font-weight: 400;
                font-style: normal;
        }

`;

export default GlobalStyles;
