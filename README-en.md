# Efficient Blueprint Toolkit Based on Tauri v2.0

**[简体中文](README.md)** | **English**

[![Stars](https://img.shields.io/github/stars/guapi-exe/McSTools?style=flat-square&label=Stars)](https://github.com/guapi-exe/McSTools/stargazers)
[![Rust](https://img.shields.io/badge/Built%20With-Rust-orange?logo=rust)](https://www.rust-lang.org/)
[![Tauri](https://img.shields.io/badge/Framework-Tauri%202.0-blue)](https://tauri.app/)
[![License](https://img.shields.io/badge/License-AGPLv3-green)]()

> A cross-platform toolkit built with Rust, delivering exceptional memory safety and native-level performance
>
> Current version: v1.4.0

---

##  Version 1.4.0
- **Structure Preview Tool Refactor**  
  Focused on refactoring and optimizing the structure preview feature to improve generation efficiency, display quality, and interaction stability.
- **Scope-Focused Update**  
  This release is centered on the structure preview workflow and does not represent a broad feature overhaul across unrelated modules.
- **Stability and Compatibility Improvements**  
  Adjusted preview behavior for common edge cases to reduce display anomalies and improve compatibility under different data conditions.

---

##  Project
- **High-Performance Core**: Achieves ultimate memory safety and efficient computation through Rust
- **Cross-Platform Support**: Built with Tauri framework, compatible with Windows/macOS/Linux
- **Modular Design**: Functional components are freely extensible to meet advanced development needs

---

##  Implemented Features

### Blueprint Management
- **Version Control System**  
  Complete blueprint iteration history tracking and diff comparison
- **Smart Material Analysis**  
  Automatically calculates building material usage and resource consumption
- **Data Insights**  
  Native source data

### Blueprint Processing
- **Format Conversion Engine**  
  `Supports mutual conversion between 4 mainstream blueprint formats`（*.schem ↔ *.nbt ↔ ...）
- **Smart Block Replacement**
    - Simple Mode: Preserves target block attributes, only replaces ID
    - Precision Mode: Fully overwrites block ID and attribute sets
- **Blueprint Splitter**  
  Intelligent large blueprint splitting and reassembly module

### Creative Tools
- **Themes**  
  Customizable UI theme colors/layouts/visual elements
- **Map Art Generator**  
  ▨ Flat Mode: Fast pixel art conversion  
  ▦ 3D Mode: Three-dimensional voxel art construction

---

##  In-Development Features
- **BE Blueprint Adaptation**  
  Support for Bedrock Edition blueprint parsing and conversion


---

##  Planned Development Roadmap
- **Cloud Sync**  
  Cross-device blueprint library synchronization

---

##  Latest Updates
- **v1.4.0 Release**  
  This release focuses on restructuring and optimizing the structure preview tool with improvements to efficiency, interaction, and stability.
- **Structure Preview Tool Refactor**  
  The structure preview workflow was refactored to improve the display process and performance stability during preview generation.
- **Compatibility and Stability Adjustments**  
  Fixed common preview exceptions and improved compatibility across varied data inputs and runtime conditions.

---

![:Views](https://count.getloli.com/@guapi-exe_McSTools?name=guapi-exe_McSTools&theme=original-new&padding=8&offset=0&align=top&scale=1&pixelated=1&darkmode=auto)
##  Build Instructions
```bash
# Install dependencies
pnpm install

# Run in dev mode
pnpm run tauri dev

# Build for production
pnpm run tauri build