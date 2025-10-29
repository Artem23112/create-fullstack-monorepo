function getRootPackageJson(appName) {
  return {
    name: appName,
    scripts: {
      "dev:frontend":
        'concurrently -n shared,frontend -c cyan,magenta "pnpm --filter shared watch:index" "pnpm --filter frontend dev"',
      "dev:backend":
        'pnpm --filter shared build && concurrently -n shared:index,shared:tsc,backend -c cyan,yellow,green "pnpm --filter shared watch:index" "pnpm --filter shared watch:tsc" "pnpm --filter backend dev"',
      build: "pnpm clean && pnpm -r run build",
      "build:shared": "pnpm --filter shared run build",
      "build:backend": "pnpm --filter backend run build",
      "build:frontend": "pnpm --filter frontend run build",
      clean: "pnpm -r exec rimraf dist",
      "start:frontend": "pnpm --filter frontend run preview",
      "start:backend": "pnpm --filter backend run start",
    },
    devDependencies: {
      concurrently: "^9.2.1",
      prettier: "^3.6.2",
      rimraf: "^6.0.1",
      typescript: "^5.6.3",
    },
  };
}

function getWorkspaceYaml() {
  return `packages:
  - 'packages/*'
`;
}

module.exports = {
  getRootPackageJson,
  getWorkspaceYaml,
};
