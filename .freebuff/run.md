# Taksh Studios — Dev Server Run Doc

## Reproduce uncommitted artifacts

This is the main checkout; no artifact copying is needed. The `.env.local` file is already present.

If starting from a fresh checkout:

1. `cp /Users/amanmahto/TakshStudios/.env.local .env.local` (procedure only — never commit secret values)
2. `npm install`

## Run the dev server

```bash
# Port 3000 is the project default. Use it if free; otherwise pick another and pass -p <port>.
launchctl submit -l com.freebuff.preview-1e769ddc -- /bin/sh -c \
  "export PATH=/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin && \
   cd /Users/amanmahto/TakshStudios && \
   exec node node_modules/.bin/next dev -p 3000 \
     > /Users/amanmahto/TakshStudios/.freebuff/preview-1e769ddc-4923-46b9-9eb2-32188cf7a776.log 2>&1"
```

**Note:** The `PATH` export is required because launchd uses a minimal environment that doesn't include Homebrew's node.

### Verify

```bash
lsof -i :3000 -t          # Should print a PID
kill -0 <pid>             # Should exit 0 (process alive)
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000  # Should return 200
```

### Teardown

```bash
launchctl remove com.freebuff.preview-1e769ddc
```
