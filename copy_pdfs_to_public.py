#!/usr/bin/env python3
"""
Copy Karnataka PDFs from src/assets to public/assets so they can be accessed via HTTP
"""

import shutil
from pathlib import Path

SOURCE_DIR = Path("Frontend/src/assets/PDF/karnataka")
DEST_DIR = Path("Frontend/public/assets/PDF/karnataka")

def copy_pdfs_to_public():
    """Copy all PDFs from src to public folder"""
    print("=" * 70)
    print("Copying Karnataka PDFs to Public Folder for Web Access")
    print("=" * 70 + "\n")
    
    if not SOURCE_DIR.exists():
        print(f"[ERROR] Source directory not found: {SOURCE_DIR}")
        return
    
    copied = 0
    
    # Walk through all category folders
    for category_folder in sorted(SOURCE_DIR.iterdir()):
        if not category_folder.is_dir():
            continue
        
        category_name = category_folder.name
        dest_category_folder = DEST_DIR / category_name
        
        # Create destination folder
        dest_category_folder.mkdir(parents=True, exist_ok=True)
        
        print(f"Processing: {category_name}")
        
        # Copy all PDFs in this category
        for pdf_file in sorted(category_folder.glob("*.pdf")):
            dest_path = dest_category_folder / pdf_file.name
            
            try:
                shutil.copy2(pdf_file, dest_path)
                print(f"  [OK] {pdf_file.name}")
                copied += 1
            except Exception as e:
                print(f"  [ERROR] {pdf_file.name}: {str(e)}")
    
    print(f"\n{'=' * 70}")
    print(f"Summary: Copied {copied} PDFs")
    print(f"{'=' * 70}")
    print(f"\n[SUCCESS] PDFs are now accessible at:")
    print(f"  /assets/PDF/karnataka/[category]/[filename].pdf")

if __name__ == "__main__":
    copy_pdfs_to_public()

