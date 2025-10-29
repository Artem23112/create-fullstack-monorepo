function getBackendFiles() {
  return {
    'src/index.ts': `import express from 'express';
import { user } from 'shared'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: \`Hello \${user} from Backend\`,
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,

    'package.json': JSON.stringify({
      name: "backend",
      type: "module",
      main: "dist/index.js",
      scripts: {
        "dev": "tsx watch --tsconfig tsconfig.json src/index.ts",
        "prebuild": "rimraf dist",
        "build": "tsc -b && tsc-alias",
        "start": "node dist/index.js"
      },
      dependencies: {
        "express": "^4.21.1",
        "shared": "workspace:*"
      },
      devDependencies: {
        "@types/express": "^5.0.0",
        "@types/node": "^22.10.1",
        "tsc-alias": "^1.8.16",
        "tsx": "^4.19.2",
        "typescript": "^5.6.3"
      }
    }, null, 2),

    'tsconfig.json': JSON.stringify({
      compilerOptions: {
        target: "ES2020",
        module: "nodenext",
        outDir: "./dist",
        rootDir: "./src",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        moduleResolution: "nodenext",
        forceConsistentCasingInFileNames: true,
        paths: {
          "@/*": ["./src/*"],
          "shared": ["../shared/src"]
        }
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"]
    }, null, 2)
  };
}

module.exports = { getBackendFiles };
