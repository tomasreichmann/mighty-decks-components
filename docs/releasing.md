# Updating the checked-in distribution

The source repository is the distribution channel. After changing runtime or
public content, regenerate the complete PNG baseline when required, then run:

```powershell
pnpm distribution:prepare
pnpm distribution:check
```

Commit the changed `distribution/` tree with its source inputs. Consumers pin a
full commit SHA and verify the copied files with their local sync script; no npm
publish, GitHub Release asset, or release branch is part of this workflow.
