# Among Us Mod Selector

### How to use:

1. Download the release from the releases tag or Build from source below

2. Drag the contents of the release.zip next to your "Among Us" Installation (default: "C:\Program Files (x86)\Steam\steamapps\common")

3. Create folders inside versions with all your among us versions, a few popular versions are in releases
    - File structure example below
    ```null
    ├── Versions
        ├── Town Of Us
        ├── The Other Roles
        ├── Vanilla
    └── AmongUsModSelector.exe
    ```

4. Open "AmongUsLauncher" Folder and run AmongUsLauncher.exe

5. Select the version you want and wait for the game to launch!

-----
### Build from source:
1. Install dependencies with:
    ```bash
    bun install
    ```
2. Then to Compile, Run:
    ```bash
    bun run build
    ```
3. Then Create a Folder called "Versions" next to the .exe

4. That .exe and "Versions" folder is your "release.zip". **(Ignore/Delete the .ico and .js file)**