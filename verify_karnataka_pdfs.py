#!/usr/bin/env python3
"""
Verify all Karnataka PDFs are accessible and working
"""

from pathlib import Path
import os

PROJECT_PDF_DIR = Path("Frontend/src/assets/PDF/karnataka")

def verify_pdfs():
    """Verify all PDFs exist and are accessible"""
    print("=" * 70)
    print("Verifying Karnataka RTI PDFs")
    print("=" * 70 + "\n")
    
    if not PROJECT_PDF_DIR.exists():
        print(f"[ERROR] Project PDF directory not found: {PROJECT_PDF_DIR}")
        return
    
    total_pdfs = 0
    accessible_pdfs = 0
    missing_pdfs = []
    
    # Walk through all category folders
    for category_folder in sorted(PROJECT_PDF_DIR.iterdir()):
        if not category_folder.is_dir():
            continue
        
        category_name = category_folder.name
        print(f"\n{category_name}:")
        
        pdfs = list(category_folder.glob("*.pdf"))
        if not pdfs:
            print(f"  [WARNING] No PDFs found")
            continue
        
        for pdf_file in sorted(pdfs):
            total_pdfs += 1
            file_size = pdf_file.stat().st_size
            
            if file_size > 0:
                print(f"  [OK] {pdf_file.name} ({file_size:,} bytes)")
                accessible_pdfs += 1
            else:
                print(f"  [ERROR] {pdf_file.name} (0 bytes - empty file!)")
                missing_pdfs.append(pdf_file)
    
    print(f"\n{'=' * 70}")
    print(f"Summary:")
    print(f"  Total PDFs: {total_pdfs}")
    print(f"  Accessible: {accessible_pdfs}")
    print(f"  Issues: {len(missing_pdfs)}")
    print(f"{'=' * 70}")
    
    if missing_pdfs:
        print(f"\n[WARNING] Found {len(missing_pdfs)} PDFs with issues:")
        for pdf in missing_pdfs:
            print(f"  - {pdf}")
    
    # Check Forest Department specifically
    forest_pdf = PROJECT_PDF_DIR / "RTI Karnataka Environment & Resources" / "RTI Template for Karnataka Forest Department.pdf"
    if forest_pdf.exists():
        size = forest_pdf.stat().st_size
        print(f"\n[SUCCESS] Forest Department PDF is accessible:")
        print(f"  Location: {forest_pdf}")
        print(f"  Size: {size:,} bytes")
        print(f"  Full Path: {forest_pdf.absolute()}")
    else:
        print(f"\n[ERROR] Forest Department PDF not found!")

if __name__ == "__main__":
    verify_pdfs()

