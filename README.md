<h1 align="center">FreshRSS Favorites Export Converter</h1>
<p align="center">
  <img src="https://github.com/lx4r/freshrss-favorites-export-converter/actions/workflows/tests.yml/badge.svg" alt="test status" />
</p>

> A small tool to generate files to view favorites exported from [*FreshRSS*](https://freshrss.org/) and import them into *Firefox* as bookmarks

## Features

This tool generates two HTML files: One that just contains the exported favorites in a simple table and can be viewed in any browser and another one that can be used to import the favorites into *Firefox* as bookmarks.

## Requirements

- [Deno](http://deno.land/)

## Usage

### Step 1: Export Favorites From FreshRSS

1. Click "Subscription management" in the top left.
2. Go to "Import / export" -> "Export".
3. Select "Export your favourites" and click "Export".
4. Download the JSON file.

### Step 2: Install and Run the Tool

#### Option A (Easier): Let Deno Get the Code From GitHub

- `deno run --allow-read --allow-write https://github.com/lx4r/freshrss-favorites-export-converter/raw/main/main.ts <path to the JSON file containing FreshRSS's favorites>`
    - `--allow-read`: Required as the script needs to read the favorites exported from *FreshRSS* from the JSON file
    - `--allow-write`: Required to allow the script to save the newly generated files

#### Option B: Manually Clone and Run Locally

1. Clone this repository.
2. Navigate to the cloned folder.
3. Execute the script: `deno run --allow-read --allow-write main.ts <path to the JSON file containing FreshRSS's favorites>` (see above for why the flags are needed)

### Step 3: Use the Generated HTML Files

#### `freshrss_favorites_for_display.html`

This is a conventional HTML file and can be viewed in any browser.

#### `freshrss_favorites_for_firefox_import.html`

This file can be used to import the favorites into *Firefox*:

1. Click the hamburger menu in the top right.
2. Go to "Library" -> "Bookmarks" -> "Manage Bookmarks".
3. In the top toolbar: Go to "Import and Backup" -> "Import Bookmarks from HTML ..." and select the `freshrss_favorites_for_firefox_import.html` file previously generated.

## Development Setup

- Clone the repository.
- Tests can be executed by running `deno test`.
- Configuration files for the [*Deno* plugin](https://github.com/denoland/vscode_deno) for *VS Code* and for *VS Code*'s debugger are included in this repository in the `.vscode` folder.

## Reporting a bug

Please [open an issue](https://github.com/lx4r/freshrss-favorites-export-converter/issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
