devblog/
│
├── public/                         # Static assets
│   └── favicon.ico
│
├── supabase/                       # Backend (Edge Functions)
│   └── functions/
│       └── generate-blog/
│           └── index.ts            # 🔒 Private prompt logic + Groq API integration
│
├── src/
│   ├── assets/                     # Images & static resources
│   │   └── logo.png
│   │
│   ├── context/                    # Global state management
│   │   └── AuthContext.jsx         # Authentication context
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.js              # Login / Logout / Session handling
│   │   ├── useGitHub.js            # Fetch GitHub repos + README
│   │   ├── useBlogs.js             # Supabase CRUD operations
│   │   └── useGenerate.js          # Call edge function + regenerate blog
│   │
│   ├── lib/                        # API & service configuration
│   │   ├── supabaseClient.js       # Supabase initialization
│   │   └── githubApi.js            # GitHub REST API calls
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── SearchBar.jsx
│   │   ├── BlogCard.jsx
│   │   ├── BlogFeed.jsx
│   │   ├── Pagination.jsx
│   │   ├── Footer.jsx
│   │   ├── ScrollUpButton.jsx
│   │   ├── RepoSelectorModal.jsx
│   │   ├── RepoCard.jsx
│   │   ├── ToneSelector.jsx
│   │   ├── GeneratingLoader.jsx
│   │   ├── BlogEditor.jsx
│   │   ├── EditorToolbar.jsx
│   │   └── RegenerateButton.jsx
│   │
│   ├── pages/                      # Application pages (Routing)
│   │   ├── Home.jsx
│   │   ├── BlogDetail.jsx
│   │   ├── CreateBlog.jsx
│   │   ├── AccountSettings.jsx
│   │   ├── Login.jsx
│   │   └── NotFound.jsx
│   │
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles
│
├── .env                            # Environment variables (DO NOT COMMIT)
├── .gitignore                      # Git ignored files
├── index.html                      # HTML template
└── package.json                    # Project dependencies & scripts
