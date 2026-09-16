# Artifact scripts

Use only repository-local inputs and explicit output roots. Validate destructive paths,
make failures observable, clean resources, and stage artifacts before publication. Do
not add sibling-repository fallbacks. Scripts orchestrate outputs and are not library
runtime dependencies.
