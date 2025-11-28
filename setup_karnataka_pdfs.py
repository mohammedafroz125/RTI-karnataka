#!/usr/bin/env python3
"""
Script to set up Karnataka RTI PDFs from Delhi PDFs
- Creates folder structure for Karnataka PDFs
- Copies Delhi PDFs with Karnataka naming
- Lists PDFs that need manual text replacement (Delhi -> Karnataka)
- Lists missing PDFs that need to be created
"""

import os
import shutil
from pathlib import Path

# Base paths
BASE_DIR = Path("Frontend/src/assets/PDF")
DELHI_DIR = BASE_DIR / "delhi"
KARNATAKA_DIR = BASE_DIR / "karnataka"

# Mapping of Delhi to Karnataka PDFs
# Format: (delhi_category, delhi_filename, karnataka_category, karnataka_filename)
PDF_MAPPINGS = [
    # Police & Security
    ("RTI Delhi Police & Security", "RTI Template For Delhi Police.pdf", 
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Police Department.pdf"),
    ("RTI Delhi Police & Security", "RTI Template For Delhi Fire Services Department.pdf",
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Fire Services Department.pdf"),
    ("RTI Delhi Police & Security", "RTI Template For Delhi Prisoners Department.pdf",
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Prisons Department.pdf"),
    ("RTI Delhi Police & Security", "RTI Template For Delhi Home Department.pdf",
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Home Department.pdf"),
    ("RTI Delhi Police & Security", "RTI Template For Delhi Law, Justice & Legislative Affairs Department.pdf",
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Law Department.pdf"),
    ("RTI Delhi Police & Security", "RTI Template For  Delhi Disaster Management Department.pdf",
     "RTI Karnataka Police & Security", "RTI Template for Karnataka Disaster Management Department.pdf"),
    
    # Finance & Revenue (from Government Services)
    ("RTI Delhi Government Services", "RTI Template for Delhi Finance Department.pdf",
     "RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Finance Department.pdf"),
    ("RTI Delhi Government Services", "RTI Template for Delhi Revenue Department.pdf",
     "RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Revenue Department.pdf"),
    ("RTI Delhi Government Services", "RTI Template for Delhi Registration & Stamps Department.pdf",
     "RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Registration & Stamps Department.pdf"),
    ("RTI Delhi Government Services", "RTI Template for Delhi Planning Department.pdf",
     "RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Planning Department.pdf"),
    ("RTI Delhi Commerce & Industry", "RTI Template for Delhi Value Added Tax Department.pdf",
     "RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Commercial Taxes Department.pdf"),
    
    # Transport & Infrastructure (from Municipal & Housing)
    ("RTI Delhi Government Services", "RTI Template for Delhi Transport Department.pdf",
     "RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Transport Department.pdf"),
    ("RTI Delhi Municipal & Housing", "RTI Template For Delhi Public Works Department (PWD).pdf",
     "RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Public Works Department (PWD).pdf"),
    ("RTI Delhi Municipal & Housing", "RTI Template For Delhi Urban Development Department.pdf",
     "RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Urban Development Department.pdf"),
    ("RTI Delhi Municipal & Housing", "RTI Template For Delhi Rural Development Department.pdf",
     "RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Rural Development & Panchayat Raj Department.pdf"),
    
    # Education & Health
    ("RTI Delhi Government Services", "RTI Template for Delhi Education Department.pdf",
     "RTI Karnataka Education & Health", "RTI Template for Karnataka Department of Primary & Secondary Education.pdf"),
    ("RTI Delhi Government Services", "RTI Template for Delhi Health & Family Welfare.pdf",
     "RTI Karnataka Education & Health", "RTI Template for Karnataka Health & Family Welfare Department.pdf"),
    
    # Social Welfare
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Social Welfare Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Social Welfare Department.pdf"),
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Scheduled Castes & Scheduled Tribes Welfare Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Scheduled Castes Development Department.pdf"),
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Women & Child Development Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Women & Child Development Department.pdf"),
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Backward Classes Welfare Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Backward Classes Welfare Department.pdf"),
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Minority Affairs Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Minority Welfare Department.pdf"),
    ("RTI Delhi Social Welfare", "RTI Template for Delhi Youth & Sports Department.pdf",
     "RTI Karnataka Social Welfare", "RTI Template for Karnataka Youth & Sports Department.pdf"),
    
    # Commerce & Industry
    ("RTI Delhi Commerce & Industry", "RTI Template for Delhi Industries Department.pdf",
     "RTI Karnataka Commerce & Industry", "RTI Template for Karnataka Industries & Commerce Department.pdf"),
    ("RTI Delhi Commerce & Industry", "RTI Template for Delhi Labour Department.pdf",
     "RTI Karnataka Commerce & Industry", "RTI Template for Karnataka Labour Department.pdf"),
    ("RTI Delhi Commerce & Industry", "RTI Template for Delhi Food, Civil Supplies & Consumer Affairs Department.pdf",
     "RTI Karnataka Commerce & Industry", "RTI Template for Karnataka Food & Civil Supplies Department.pdf"),
    ("RTI Delhi Environment & Resources", "RTI Template for Delhi Mines & Geology Department.pdf",
     "RTI Karnataka Commerce & Industry", "RTI Template for Karnataka Mines & Geology Department.pdf"),
    
    # Environment & Resources
    ("RTI Delhi Environment & Resources", "RTI Template for Delhi Environment Department.pdf",
     "RTI Karnataka Environment & Resources", "RTI Template for Karnataka Environment Department.pdf"),
    ("RTI Delhi Environment & Resources", "RTI Template for Delhi Forest & Wildlife Department.pdf",
     "RTI Karnataka Environment & Resources", "RTI Template for Karnataka Forest Department.pdf"),
    ("RTI Delhi Utilities & Infrastructure", "RTI Template for Delhi Irrigation & Flood Control Department.pdf",
     "RTI Karnataka Environment & Resources", "RTI Template for Karnataka Irrigation & CAD Department.pdf"),
    ("RTI Delhi Utilities & Infrastructure", "RTI Template For Delhi Water Supply Department.pdf",
     "RTI Karnataka Environment & Resources", "RTI Template for Karnataka Water Resources Department.pdf"),
    ("RTI Delhi Utilities & Infrastructure", "RTI Delhi Power Department.pdf",
     "RTI Karnataka Environment & Resources", "RTI Template for Karnataka Energy Department.pdf"),
    
    # Information & Technology
    ("RTI Delhi Information & Technology", "RTI Template for Delhi Information Technology Department.pdf",
     "RTI Karnataka Information & Technology", "RTI Template for Karnataka Information Technology Department.pdf"),
    ("RTI Delhi Information & Technology", "RTI Template for Delhi Information & Publicity Department.pdf",
     "RTI Karnataka Information & Technology", "RTI Template for Karnataka Information & Public Relations Department.pdf"),
    
    # Culture & Tourism
    ("RTI Delhi Culture & Tourism", "RTI Template for Delhi Tourism Department.pdf",
     "RTI Karnataka Culture & Tourism", "RTI Template for Karnataka Tourism Department.pdf"),
    ("RTI Delhi Culture & Tourism", "RTI Template for Delhi Archaeology Department.pdf",
     "RTI Karnataka Culture & Tourism", "RTI Template for Karnataka Archaeology Department.pdf"),
    ("RTI Delhi Culture & Tourism", "RTI Template for Delhi Art, Culture & Languages Department.pdf",
     "RTI Karnataka Culture & Tourism", "RTI Template for Karnataka Kannada & Culture Department.pdf"),
]

# Missing PDFs that don't have Delhi equivalents
MISSING_PDFS = [
    ("RTI Karnataka Finance & Revenue", "RTI Template for Karnataka Treasuries Department.pdf"),
    ("RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Municipal Administration Department.pdf"),
    ("RTI Karnataka Transport & Infrastructure", "RTI Template for Karnataka Infrastructure Development Department.pdf"),
    ("RTI Karnataka Education & Health", "RTI Template for Karnataka Higher Education Department.pdf"),
    ("RTI Karnataka Education & Health", "RTI Template for Karnataka Technical Education Department.pdf"),
    ("RTI Karnataka Education & Health", "RTI Template for Karnataka Medical Education Department.pdf"),
    ("RTI Karnataka Agriculture & Rural Development", "RTI Template for Karnataka Agriculture Department.pdf"),
    ("RTI Karnataka Agriculture & Rural Development", "RTI Template for Karnataka Horticulture Department.pdf"),
    ("RTI Karnataka Agriculture & Rural Development", "RTI Template for Karnataka Animal Husbandry & Veterinary Services Department.pdf"),
    ("RTI Karnataka Agriculture & Rural Development", "RTI Template for Karnataka Co-operation Department.pdf"),
    ("RTI Karnataka Social Welfare", "RTI Template for Karnataka Scheduled Tribes Welfare Department.pdf"),
    ("RTI Karnataka Commerce & Industry", "RTI Template for Karnataka Handlooms & Textiles Department.pdf"),
    ("RTI Karnataka Information & Technology", "RTI Template for Karnataka e-Governance Department.pdf"),
    ("RTI Karnataka Culture & Tourism", "RTI Template for Karnataka Religious & Charitable Endowments Department.pdf"),
]

def create_folders():
    """Create all necessary folder structures"""
    categories = set()
    for _, _, category, _ in PDF_MAPPINGS:
        categories.add(category)
    for category, _ in MISSING_PDFS:
        categories.add(category)
    
    for category in categories:
        folder_path = KARNATAKA_DIR / category
        folder_path.mkdir(parents=True, exist_ok=True)
        print(f"✓ Created folder: {category}")

def copy_pdfs():
    """Copy Delhi PDFs to Karnataka folders with new names"""
    print("\n=== Copying Delhi PDFs to Karnataka folders ===\n")
    
    copied = 0
    not_found = 0
    
    for delhi_cat, delhi_file, karnataka_cat, karnataka_file in PDF_MAPPINGS:
        source_path = DELHI_DIR / delhi_cat / delhi_file
        dest_path = KARNATAKA_DIR / karnataka_cat / karnataka_file
        
        if not source_path.exists():
            print(f"✗ Source not found: {source_path}")
            not_found += 1
            continue
        
        # Create destination folder if it doesn't exist
        dest_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Copy the file
        try:
            shutil.copy2(source_path, dest_path)
            print(f"✓ Copied: {delhi_file} -> {karnataka_file}")
            copied += 1
        except Exception as e:
            print(f"✗ Error copying {delhi_file}: {str(e)}")
            not_found += 1
    
    print(f"\n=== Copy Summary ===")
    print(f"Copied: {copied}")
    print(f"Not found: {not_found}")
    print(f"Total: {len(PDF_MAPPINGS)}")
    
    if copied > 0:
        print(f"\n⚠ IMPORTANT: You need to manually edit these {copied} PDFs to replace 'Delhi' with 'Karnataka' in the content.")
        print("   You can use PDF editing software or online tools to do this.")

def list_missing_pdfs():
    """List PDFs that need to be created manually"""
    print("\n" + "=" * 70)
    print("MISSING PDFs (Need to be created manually)")
    print("=" * 70 + "\n")
    
    for i, (category, filename) in enumerate(MISSING_PDFS, 1):
        full_path = KARNATAKA_DIR / category / filename
        print(f"{i:2d}. {category}")
        print(f"     File: {filename}")
        print(f"     Path: {full_path}\n")
    
    print(f"Total missing PDFs: {len(MISSING_PDFS)}")
    print("\nThese PDFs don't have Delhi equivalents and need to be created from scratch.")

def generate_missing_pdfs_list():
    """Generate a text file listing all missing PDFs"""
    output_file = Path("MISSING_KARNATAKA_PDFS.txt")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=" * 70 + "\n")
        f.write("MISSING KARNATAKA RTI PDFs\n")
        f.write("=" * 70 + "\n\n")
        f.write("These PDFs need to be created manually:\n\n")
        
        for i, (category, filename) in enumerate(MISSING_PDFS, 1):
            full_path = KARNATAKA_DIR / category / filename
            f.write(f"{i:2d}. {category}\n")
            f.write(f"     File: {filename}\n")
            f.write(f"     Full Path: {full_path}\n\n")
        
        f.write(f"\nTotal: {len(MISSING_PDFS)} PDFs\n")
    
    print(f"\n✓ Generated missing PDFs list: {output_file}")

def main():
    print("=" * 70)
    print("Karnataka RTI PDF Setup Script")
    print("=" * 70)
    
    # Check if Delhi directory exists
    if not DELHI_DIR.exists():
        print(f"\n✗ Error: Delhi PDF directory not found: {DELHI_DIR}")
        print("   Please ensure you're running this script from the project root.")
        return
    
    # Create folder structure
    print("\n=== Creating folder structure ===")
    create_folders()
    
    # Copy PDFs
    copy_pdfs()
    
    # List missing PDFs
    list_missing_pdfs()
    
    # Generate missing PDFs list file
    generate_missing_pdfs_list()
    
    print("\n" + "=" * 70)
    print("Setup complete!")
    print("=" * 70)
    print("\nNext steps:")
    print("1. Manually edit the copied PDFs to replace 'Delhi' with 'Karnataka'")
    print("2. Create the missing PDFs listed in MISSING_KARNATAKA_PDFS.txt")
    print("3. Verify all PDFs are in the correct folders")

if __name__ == "__main__":
    main()

