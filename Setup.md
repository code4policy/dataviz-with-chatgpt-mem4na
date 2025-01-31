# Fix `externally-managed-environment` Error

If you see this error with `pip3 install`:

```bash
error: externally-managed-environment
```

## Fix:

1. **Make the config directory:**

   ```bash
   mkdir -p ~/.config/pip
   ```

2. **Create and edit `pip.conf`:**

   ```bash
   touch ~/.config/pip/pip.conf
   subl ~/.config/pip/pip.conf
   ```

3. **Add this:**

   ```ini
   [global]
   break-system-packages = true
   ```

4. **Save the file and verify:**
   Run the following command:

   ```bash
   pip config list
   ```

   What you should see:

   ```
   global.break-system-packages = true
   ```

5. **Install your package:**

   ```bash
   python3 -m http.server
   pip3 install pandas
   ```

Done!

_By ChatGPT + Dhrumil_
