# Updating the prebuilt Git package

The source repository is the distribution channel. After changing runtime or
public content, regenerate the complete PNG baseline when required, then run:

```powershell
pnpm release:prepare
pnpm release:check
```

Commit changed `dist/`, `assets/`, and `generated/` outputs with their source
inputs. Consumers pin the resulting full commit SHA and use package resources from
`node_modules`; no npm publication or consumer-side asset build is required.
