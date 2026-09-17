# Updating the Git package

The repository root is the Git-installable package. After changing runtime or
public content, regenerate the complete PNG baseline when required, then run:

```powershell
pnpm release:prepare
```

Commit the changed root-package artifacts with their source inputs. Consumers
pin a full commit SHA; installation runs no generation or sync scripts.
